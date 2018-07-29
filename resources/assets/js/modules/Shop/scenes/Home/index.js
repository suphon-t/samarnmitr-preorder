import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchProducts } from '../../store/actions'

import Sets from '../../components/Sets'
import ProductList from '../../components/Product/ProductList'

class Home extends Component {

    componentWillMount() {
        this.props.fetchProducts()
    }

    render() {
        if (!this.props.products) {
            return null
        }
        return (
            <div className="col-sm-12">
                <Sets sets={this.props.sets} />
                <div className="sets-products-divider" />
                <ProductList products={this.props.products} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.shop.isLoading,
    products: state.shop.products,
    sets: state.shop.sets,
})

const mapDispatchToProps = {
    fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
