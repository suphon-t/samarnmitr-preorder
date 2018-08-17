import Http from '../../utils/Http'

export const loadOrderStatus = (id, key) => Http.post('manage/orderStatus', {
    id: id,
    key: key,
})
