import React, { Component } from 'react'
import { connect } from 'react-redux'

import Public from './Public'
import { fetchUser } from "../modules/Auth/service";

class PrivateLayout extends Component {

    componentWillMount() {
        const { dispatch, user } = this.props

        if (!user.id) {
            dispatch(fetchUser())
        }
    }

    render() {
        return (
            <Public>
                { this.props.children }
            </Public>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

export default connect(mapStateToProps)(PrivateLayout)
