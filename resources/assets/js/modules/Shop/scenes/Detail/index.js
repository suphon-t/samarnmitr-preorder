import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchProducts } from '../../store/actions'

import ProductDetail from '../../components/Product/ProductDetail'
import SetDetail from '../../components/Product/SetDetail'
import RecommendedList from '../../components/Product/RecommendedList'
import routes from '../../../../routes/routes'
import { findItem, shuffle } from '../../shopUtils'

const redirectHome = () => (<Redirect to={routes.web.home.get()} />)

class Detail extends Component {

    constructor(props) {
        super(props)

        this.recommendations = null
        this.product = null
    }

    componentWillMount() {
        this.props.fetchProducts()
    }

    render() {
        const { products, sets } = this.props
        if (!products) {
            return null
        }
        // noinspection EqualityComparisonWithCoercionJS
        const product = findItem(this.props.match.params.productId, products, sets)
        if (!product) {
            return redirectHome()
        }
        const DetailView = product['is_set'] ? SetDetail : ProductDetail
        this.recommendations = this.recommendations && this.product === product
            ? this.recommendations : shuffle([...sets, ...products].filter(it => it.id !== product.id)).slice(0, 4)
        return (
            <React.Fragment>
                <DetailView product={product} />
                <RecommendedList recommendations={this.recommendations} />
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
