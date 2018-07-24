import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import routes from "./routes";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return <Route {...rest} render={props => (
        isAuthenticated
            ? <Component {...props}/>
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
    }
}

export default connect(mapStateToProps)(PrivateRoute)
