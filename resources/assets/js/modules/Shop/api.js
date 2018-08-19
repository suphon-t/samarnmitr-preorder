import Http from '../../utils/Http'

const sets = [
    {
        text: 'Set 1 Text'
    },
    {
        text: 'Set 2 Text'
    },
    {
        text: 'Set 3 Text'
    },
]

export const fetchProducts = () => Http.get('shop/products')

export const makeOrder = contents => Http.put('shop/orders', contents)

export const fetchOrder = () => Http.get('shop/myOrder')

export const editOrder = contents => Http.put('shop/myOrder', contents)

export const chargeOrder = token => Http.post('shop/myOrder/charge', { token })
