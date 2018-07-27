import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Translate } from 'react-localize-redux'

import routes from '../../routes/routes'
import { logout } from '../../modules/Auth/service'

class UserMenu extends Component {

    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(e) {
        e.preventDefault()

        this.props.dispatch(logout())
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { this.props.user.name }
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a onClick={this.handleLogout} className="dropdown-item" href="#">
                            <Translate id="auth.logout" />
                        </a>
                    </div>
                </li>
            )
        } else {
            return (
                <li className="nav-item">
                    <Link to={routes.auth.login.get()} className="nav-link" href="">
                        <Translate id="auth.login" />
                    </Link>
                </li>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(UserMenu)
