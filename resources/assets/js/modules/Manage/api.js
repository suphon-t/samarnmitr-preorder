import Http from '../../utils/Http'

export const loadOrderStatus = (id, key) => Http.post('manage/orderStatus', {
    id: id,
    key: key,
})

export const editOrder = options => Http.post('manage/editOrder', options)

export const fetchOrders = () => Http.get('manage/orders')
