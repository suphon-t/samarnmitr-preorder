
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap'

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { LocalizeProvider } from 'react-localize-redux'

import config from './config'
import Routes from './routes'
import store from './store'
import { authCheck } from './modules/Auth/store/actions'

store.dispatch(authCheck())

Omise.setPublicKey(config.omisePublicKey)

ReactDOM.render((
    <LocalizeProvider>
        <Provider store={store}>
            <Routes />
        </Provider>
    </LocalizeProvider>
), document.getElementById('app'))
