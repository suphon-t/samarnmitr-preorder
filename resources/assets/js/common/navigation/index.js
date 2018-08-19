import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import config from '../../config'

import routes from '../../routes/routes'
import UserMenu from './UserMenu'

import shoppingCart from '../../../img/shopping_cart.svg'
import loginIcon from '../../../img/login_icon.svg'
import logoMobile from '../../../img/logo_mobile.svg'
import logoDesktop from '../../../img/logo_desktop.svg'

class Navigation extends Component {

    render() {
        const { history } = this.props
        return (
            <nav className="navbar navbar-expand-md navbar-light navbar-main">
                <div className="row justify-content-between" style={{ width: '100%' }}>
                    <div className="navbar-button-container">
                      <img src={loginIcon} className="nav-icon" onClick={()=>history.push(routes.auth.login.get())}/>
                    </div>
                    <div className="col-auto navbar-brand-container logo-desktop">
                        <Link className="col navbar-brand" to={routes.web.home.get()}>
                            <img src={logoDesktop} className="brand-nav-icon" />
                        </Link>
                    </div>
                    <div className="navbar-button-container logo-mobile">
                        <img src={logoMobile} className="nav-icon" onClick={() => history.push(routes.web.home.get())} />
                    </div>
                    <div className="navbar-button-container">
                        <img src={shoppingCart} className="nav-icon" onClick={() => history.push(routes.shop.cart.get())} />
                    </div>
                </div>

                { config.features.oldNavLinks ? (
                    <React.Fragment>
                        <Link className="navbar-brand" to={routes.web.home.get()}>
                            SAMARNMITR ’61 OFFICIAL SHOP
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
                    </React.Fragment>
                ) : null }
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

export default withRouter(connect(mapStateToProps)(Navigation))
