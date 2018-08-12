import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchOrder } from '../../store/actions'
import ChargeStatus from './components/ChargeStatus'
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
        const { isLoading, charge } = this.props
        if (isLoading) {
            return (<p>Loading...</p>)
        } else {
            if (charge) {
                return (
                    <div className="order-card">
                        <ChargeStatus charge={charge} />
                    </div>
                )
            } else {
                return (
                    <div className="order-card">
                        <CreditCardForm price={this.props.price} onSuccess={() => this.props.fetchOrder(false)}/>
                    </div>
                )
            }
        }
    }

}

const mapStateToProps = state => ({ ...state.shop.order })

const mapDispatchToProps = {
    fetchOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)
