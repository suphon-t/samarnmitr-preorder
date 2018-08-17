import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import routes from "./routes";

const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, isAdmin, requiresAdmin, ...rest }) => {
    // noinspection EqualityComparisonWithCoercionJS
    return isLoading ? null : <Route {...rest} render={props => (
        isAuthenticated
            ? (
                requiresAdmin == isAdmin
                    ? <Component {...props}/>
                    : <Redirect to={{
                        pathname: isAdmin ? routes.manage.home.get() : routes.shop.myOrder.get(),
                        state: { from: props.location },
                    }}/>
            )
            : <Redirect to={{
                pathname: routes.auth.login.get(),
                state: { from: props.location },
            }}/>
    )}/>

}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        isAdmin: store.user.admin,
        isLoading: !store.user.id,
    }
}

export default connect(mapStateToProps)(PrivateRoute)
