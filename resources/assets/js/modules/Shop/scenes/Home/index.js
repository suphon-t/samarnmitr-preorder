import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'

import { fetchProducts } from '../../store/actions'

import Sets from '../../components/Sets'
import ProductList from '../../components/Product/ProductList'

class Home extends Component {

    componentWillMount() {
        this.props.fetchProducts()
    }

    render() {
        const { translate } = this.props
        if (!this.props.products) {
            return null
        }
        return (
            <div className="col-sm-12">
                <h1 className="section-header">{ translate('shop.sets') }</h1>
                <Sets sets={this.props.sets} />
                <div className="sets-products-divider" />
                <h1 className="section-header">{ translate('shop.single_products') }</h1>
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

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Home))
