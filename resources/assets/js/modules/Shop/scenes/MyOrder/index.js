import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchOrder, fetchProducts } from '../../store/actions'
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
        // this.props.fetchProducts()
    }

    render() {
        const { products, sets, order, user } = this.props
        const { id } = user
        const { isLoading, chargeStatus, key } = order
        if (isLoading || this.props.isLoading || !key) {
            return (<p>Loading...</p>)
        } else {
            return <StatusCard id={id} value={chargeStatus ? 1 : 0} order={{ ...order, id }}
                        products={products} sets={sets} />
        }
    }
}

const mapStateToProps = state => ({
    isLoading: state.shop.isLoading,
    products: state.shop.products,
    sets: state.shop.sets,
    order: state.shop.order,
    user: state.user,
})

const mapDispatchToProps = {
    fetchOrder,
    fetchProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)
