import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import routes from '../../routes/routes'
import config from '../../config'
import UserMenu from './UserMenu'

class Navigation extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <Link className="navbar-brand" to={routes.web.home.get()}>
                        { config.title }
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <UserMenu />
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(Navigation)
