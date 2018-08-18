import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_ITEM,
    REMOVE_ITEM,
    MAKE_ORDER,
    FETCH_ORDER,
    FETCH_ORDER_SUCCESS,
    CLEAR_CART,
} from './action-types'

import * as api from '../api'

export const fetchProducts = () => {
    return dispatch => {
        dispatch({ type: FETCH_PRODUCTS })
        api.fetchProducts()
            .then(result => {
                dispatch(fetchProductsSuccess(result.data))
            })
            .catch(error => {
                dispatch(fetchProductsFailure(error))
            })
    }
}

export const fetchProductsSuccess = result => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: result,
})

export const fetchProductsFailure = error  => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: {
        error,
    },
})

export const addItem = (info, amount = 1) => ({
    type: ADD_ITEM,
    payload: {
        info,
        amount,
    },
})

export const removeItem = (info, amount = 1) => ({
    type: REMOVE_ITEM,
    payload: {
        info,
        amount,
    },
})

export const clearCart = (info, amount = 1) => ({
    type: CLEAR_CART,
    payload: {},
})

export const makeOrder = contents => {
    return dispatch => {
        dispatch({ type: MAKE_ORDER })
    }
}

export const fetchOrder = (initial = true) => {
    return dispatch => {
        dispatch({
            type: FETCH_ORDER,
            payload: {
                initial
            },
        })
        api.fetchOrder()
            .then(result => {
                dispatch({
                    type: FETCH_ORDER_SUCCESS,
                    payload: {
                        result
                    },
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}
