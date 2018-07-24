import RoutePath from '../../routes/RoutePath'
import Home from './scenes/Home'

export default {
    home: new RoutePath({
        path: '/',
        exact: true,
        component: Home
    })
}
