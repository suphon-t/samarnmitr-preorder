import React, { Component } from 'react'
import { connect } from 'react-redux'

class ManageHome extends Component {

    render() {
        return (
            <h1>Hello { this.props.user.name }!</h1>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(ManageHome)
