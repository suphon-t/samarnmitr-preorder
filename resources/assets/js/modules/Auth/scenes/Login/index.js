import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Translate } from 'react-localize-redux'

import LoginForm from '../../components/LoginForm'
import routes from '../../../../routes/routes'

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(({ isAuthenticated }) => (

    <div className="login-card">
        <div className="login-header">
            Submit your ID and password
        </div>
        <div className="login-divider"/>
        <div className="login-body">
            { isAuthenticated ? (
                <Redirect to={routes.shop.myOrder.get()} />
            ) : (
                <LoginForm />
            )}
        </div>
    </div>

))
