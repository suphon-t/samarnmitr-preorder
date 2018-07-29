import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
} from './action-types'

import * as api from '../api'

export const fetchProducts = () => {
    return dispatch => {
        dispatch({ type: FETCH_PRODUCTS })
        api.fetchProducts()
            .then(result => {
                dispatch(fetchProductsSuccess(result))
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
