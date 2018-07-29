import _ from 'lodash'
import { loadState } from '../storage'

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_ITEM,
    REMOVE_ITEM,
} from './action-types'

const initialState = {
    isLoading: false,
    cart: loadState('cart', {
        items: [],
    }),
}

const replace = (collection, match, newItem) =>
    collection.map(item => item === match ? newItem : item)

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
        default:
            return state
    }
}
