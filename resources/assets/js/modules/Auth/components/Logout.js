import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logout } from '../service'
import routes from '../../../routes/routes'

class Logout extends Component {

    componentWillMount() {
        this.props.logout()
    }

    render() {
        return this.props.isAuthenticated ? null : <Redirect to={routes.web.home.get()} />
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
