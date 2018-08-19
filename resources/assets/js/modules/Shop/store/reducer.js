import _ from 'lodash'
import { loadState } from '../storage'

import { replace } from '../shopUtils'

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_ITEM,
    REMOVE_ITEM,
    FETCH_ORDER,
    FETCH_ORDER_SUCCESS,
    CLEAR_CART,
} from './action-types'

const initialState = {
    isLoading: false,
    cart: loadState('cart', {
        items: [],
    }),
    order: {
        isLoading: false,
    },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.products,
                sets: action.payload.sets,
                categories: action.payload.categories,
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        case ADD_ITEM: {
            const { info, amount } = action.payload
            const item = state.cart.items.find(item => _.isEqual(item.info, info))
            if (item != null) {
                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        items: replace(state.cart.items, item, {
                            info,
                            amount: item.amount + amount,
                        }),
                    },
                }
            } else {
                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        items: [
                            ...state.cart.items,
                            action.payload,
                        ],
                    },
                }
            }
        }
        case REMOVE_ITEM: {
            const { info, amount } = action.payload
            const item = state.cart.items.find(item => _.isEqual(item.info, info))
            if (item != null) {
                const newAmount = item.amount - amount
                if (newAmount > 0) {
                    return {
                        ...state,
                        cart: {
                            ...state.cart,
                            items: replace(state.cart.items, item, {
                                info,
                                amount: newAmount,
                            }),
                        },
                    }
                } else {
                    return {
                        ...state,
                        cart: {
                            ...state.cart,
                            items: _.without(state.cart.items, item),
                        },
                    }
                }
            } else {
                return state
            }
        }
        case CLEAR_CART:
            return {
                ...state,
                cart: {
                    items: [],
                },
            }
        case FETCH_ORDER:
            if (action.payload.initial) {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        isLoading: true
                    },
                }
            } else {
                return state
            }
        case FETCH_ORDER_SUCCESS:
            const { id, status, total_price, chargeStatus, key, cart_contents } = action.payload.result.data
            return {
                ...state,
                order: {
                    isLoading: false,
                    id,
                    status,
                    price: total_price,
                    chargeStatus,
                    key,
                    cartContents: JSON.parse(cart_contents),
                },
            }
        default:
            return state
    }
}
