import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchOrder } from '../../store/actions'
import StatusCard from '../../components/OrderStatus/StatusCard'

class MyOrder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }
    }

    componentWillMount() {
        this.props.fetchOrder()
    }

    render() {
        const { isLoading, chargeStatus, id } = this.props.order
        if (isLoading) {
            return (<p>Loading...</p>)
        } else {
            return (
                <div className="order-card">
                    <StatusCard id={id} value={chargeStatus ? 1 : 0} order={{id, key}} />
                </div>
            )
        }
    }

}

const mapStateToProps = state => ({
    order: state.shop.order,
})

const mapDispatchToProps = {
    fetchOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)
