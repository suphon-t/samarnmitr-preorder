import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchOrder } from '../../store/actions'
import CreditCardForm  from './components/CreditCardForm'

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
        const { isLoading, status } = this.props
        if (isLoading) {
            return (<p>Loading...</p>)
        } else {
            return (
                <div className="order-card" >
                    <CreditCardForm price={this.props.price} />
                </div>
            )
        }
    }

}

const mapStateToProps = state => ({ ...state.shop.order })

const mapDispatchToProps = {
    fetchOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)
