import { combineReducers } from 'redux'

import auth from '../modules/Auth/store/reducer'
import user from '../modules/User/store/reducer'
import shop from '../modules/Shop/store/reducer'

export default combineReducers({ auth, user, shop })
