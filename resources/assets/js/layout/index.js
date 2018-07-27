//import libs
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// import services actions
import { fetchUser } from '../modules/Auth/service'

// import components
import PrivateLayout from './Private'
import PublicLayout from './Public'

class Layout extends Component {

    componentWillMount() {
        const { isAuthenticated, user } = this.props

        if (isAuthenticated && !user.id) {
            this.props.dispatch(fetchUser())
        }

    }

    render() {
        const { children, ...props } = this.props
        if (this.props.isAuthenticated) {
            return <PrivateLayout {...props}>{children}</PrivateLayout>
        }
        return <PublicLayout {...props}>{children}</PublicLayout>
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user,
    }
}

export default withRouter(connect(mapStateToProps)(Layout))
