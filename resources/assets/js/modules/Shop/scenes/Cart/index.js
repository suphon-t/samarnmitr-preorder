import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchProducts } from '../../store/actions'

import Cart from '../../components/Cart'

class CartPage extends Component {

    componentWillMount() {
        // this.props.fetchProducts()
    }

    render() {
        const { products } = this.props
        if (!products) {
            return null
        }
        return (<Cart products={products} />)
    }
}

const mapStateToProps = state => ({
    isLoading: state.shop.isLoading,
    products: state.shop.products,
})

const mapDispatchToProps = {
    fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
