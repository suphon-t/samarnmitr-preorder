import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import config from '../config'
import routes from "../routes/routes";

export default class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                    <div className="container">
                        <Link className="navbar-brand" to={routes.web.home.get()}>
                            { config.title }
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">

                            </ul>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={routes.auth.login.get()} className="nav-link" href="">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    { this.props.children }
                </div>
            </div>
        )
    }
}
