import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchProducts } from '../../store/actions'

import Divider from '../../components/Divider'
import ProductDetail from '../../components/Product/ProductDetail'
import RecommendedList from '../../components/Product/RecommendedList'
import routes from '../../../../routes/routes'

const redirectHome = () => (<Redirect to={routes.web.home.get()} />)

class Detail extends Component {

    componentWillMount() {
        this.props.fetchProducts()
    }

    render() {
        const { products } = this.props
        if (!products) {
            return null
        }
        // noinspection EqualityComparisonWithCoercionJS
        const product = products.find(product => product.id == this.props.match.params.productId)
        if (!product) {
            return redirectHome()
        }
        return (
            <div className="full-width">
                <ProductDetail product={product} />
                <Divider />
                <RecommendedList />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.shop.isLoading,
    products: state.shop.products,
})

const mapDispatchToProps = {
    fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
