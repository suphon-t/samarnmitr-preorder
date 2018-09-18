import RoutePath from '../../routes/RoutePath'
import Home from './scenes/Home'
import OrderStatus from './scenes/OrderStatus'
import OrderList from './scenes/OrderList'

export default {
    home: new RoutePath({
        path: '/manage/',
        exact: true,
        component: Home,
        auth: true,
        admin: true,
    }),
    orderStatus: new RoutePath({
        path: '/manage/orderStatus/?id=:orderId&key=:key',
        exact: true,
        component: OrderStatus,
        auth: true,
        admin: true,
    }),
    orderList: new RoutePath({
        path: '/manage/orders',
        exact: true,
        component: OrderList,
        auth: true,
        admin: true,
    }),
}
