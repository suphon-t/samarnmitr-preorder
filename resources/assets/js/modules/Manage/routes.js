import RoutePath from '../../routes/RoutePath'
import ManageHome from './scenes/Home'

export default {
    home: new RoutePath({
        path: '/manage/',
        exact: true,
        component: ManageHome,
        auth: true,
        admin: true,
    }),
}
