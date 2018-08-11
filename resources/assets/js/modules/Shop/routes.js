import RoutePath from '../../routes/RoutePath'
import Home from './scenes/Home'
import Detail from './scenes/Detail'
import Cart from './scenes/Cart'
import GetOrder from './scenes/GetOrder'
import MyOrder from './scenes/MyOrder'
import OrderStatus from './scenes/OrderStatus'

export default {
    home: new RoutePath({
        path: '/shop/',
        exact: true,
        component: Home
    }),
    detail: new RoutePath({
        path: '/shop/detail/:productId/',
        exact: true,
        component: Detail
    }),
    cart: new RoutePath({
        path: '/shop/cart/',
        exact: true,
        component: Cart
    }),
    getOrder: new RoutePath({
        path: '/shop/getOrder/?id=:orderId&key=:key',
        exact: true,
        component: GetOrder
    }),
    myOrder: new RoutePath({
        path: '/shop/myOrder/',
        exact: true,
        component: MyOrder
    }),
    orderStatus: new RoutePath({
      path: '/shop/orderStatus/',
      exact: true,
      component: OrderStatus
    }),
}
