import RoutePath from '../../routes/RoutePath'
import Login from './scenes/Login'

export default {
    login: new RoutePath({
        path: '/login',
        exact: true,
        component: Login
    })
}
