import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'

import { fetchProducts } from '../../store/actions'

import Sets from '../../components/Sets'
import ProductList from '../../components/Product/ProductList'
import CategorizedProductList from '../../components/Product/CategorizedProductList'

import setsDesktop from '../../../../../img/sets_desktop.svg'
import singleProductsDesktop from '../../../../../img/single_products_desktop.svg'
import coverDesktop from '../../../../../img/cover_desktop.png'
import coverMobile from '../../../../../img/cover_mobile.png'

class Home extends Component {

    componentWillMount() {
        this.props.fetchProducts()
    }

    getCover() {
        return (
            <React.Fragment>
                <img className="cover-mobile" src={coverMobile} />
                <img className="cover-desktop" src={coverDesktop} />
            </React.Fragment>
        )
    }

    render() {
        const {  products, sets, categories } = this.props
        if (!products) return this.getCover()
        return (
            <React.Fragment>
                { this.getCover() }
                <div className="col-sm-12">
                    <MediaQuery minDeviceWidth={768}>
                        {matches =>
                            matches ? (
                                <React.Fragment>
                                    <h1 className="section-header home-top">
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
                    </MediaQuery>
                </div>
            </React.Fragment>
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
