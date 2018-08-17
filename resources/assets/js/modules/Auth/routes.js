import RoutePath from '../../routes/RoutePath'
import Login from './scenes/Login'
import Logout from './components/Logout'

export default {
    login: new RoutePath({
        path: '/login',
        exact: true,
        component: Login
    }),
    logout: new RoutePath({
       path: '/logout',
       exact: true,
       component: Logout
    }),
}
