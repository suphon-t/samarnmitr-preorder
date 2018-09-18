import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import routes from '../../../routes/routes'

class ManageHome extends Component {

    render() {
        return (
            <div>
                <h1>Hello { this.props.user.name }!</h1>
                <Link className="btn btn-success" to={routes.manage.orderList.get()}>View orders</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(ManageHome)
