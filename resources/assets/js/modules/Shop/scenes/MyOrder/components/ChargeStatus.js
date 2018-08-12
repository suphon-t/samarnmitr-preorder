import React, { Component } from 'react'

class ChargeStatus extends Component {

    render() {
        const { charge } = this.props
        const { status } = charge
        if (status === 'successful' || status === 'pending') {
            return (<h1>Success!</h1>)
        } else {
            return (<h1>Failed!</h1>)
        }
    }
}

export default ChargeStatus
