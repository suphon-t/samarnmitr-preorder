import React, { Component } from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'

import { fetchProducts } from '../../store/actions'

import Sets from '../../components/Sets'
import ProductList from '../../components/Product/ProductList'
import CategorizedProductList from '../../components/Product/CategorizedProductList'

import setsDesktop from '../../../../../img/sets_desktop.svg'
import singleProductsDesktop from '../../../../../img/single_products_desktop.svg'

class Home extends Component {

    componentWillMount() {
        this.props.fetchProducts()
    }

    render() {
        const { translate, products, sets, categories } = this.props
        if (!products) return null
        return (
            <div className="col-sm-12">
                <Media query="(min-width: 768px)">
                    {matches =>
                        matches ? (
                            <React.Fragment>
                                <h1 className="section-header">
                                    <img src={setsDesktop} />
                                </h1>
                                <Sets sets={sets} />
                                <div className="sets-products-divider" />
                                <h1 className="section-header">
                                    <img src={singleProductsDesktop} />
                                </h1>
                                <ProductList products={products} />
                            </React.Fragment>
                        ) : (
                            <CategorizedProductList sets={sets} products={products} categories={categories} />
                        )
                    }
                </Media>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.shop.isLoading,
    products: state.shop.products,
    sets: state.shop.sets,
    categories: state.shop.categories,
})

const mapDispatchToProps = {
    fetchProducts
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Home))
