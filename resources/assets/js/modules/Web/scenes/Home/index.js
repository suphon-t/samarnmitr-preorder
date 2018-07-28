import React from 'react'
import {Redirect} from 'react-router-dom'
import routes from '../../../../routes/routes'

export default () => (<Redirect to={routes.shop.home.get()} />)
