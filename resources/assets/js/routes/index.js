import React, { Component } from 'react'

import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Layout from '../layout'

import routes from './routes'
import PrivateRoute from './private'
import PublicRoute from './public'
import RoutePath from "./RoutePath";

function flattenRoutes(routes) {
    return [...Object.values(routes).reduce((acc, item) => {
        if (item instanceof RoutePath) {
            return [...acc, item]
        } else if (item instanceof Object) {
            return [...acc, ...flattenRoutes(item)]
        }
    }, [])]
}

const allRoutes = flattenRoutes(routes)

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        { allRoutes.map((route, i) => {
                            if (route.auth) {
                                return (<PrivateRoute key={i} {...route} />)
                            } else {
                                return (<PublicRoute key={i} {...route} />)
                            }
                        }) }
                    </Switch>
                </Layout>
            </Router>
        )
    }
}
