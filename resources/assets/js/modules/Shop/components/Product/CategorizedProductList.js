import React, { Component } from 'react'

import ProductList from './ProductList'

export default class CategorizedProductList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentCategory: props.categories[0].id,
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this)
    }

    handleCategoryChange(e) {
        this.setState({ currentCategory: e.target.value })
    }

    render() {
        const { products, sets, categories } = this.props
        const allProducts = [ ...sets, ...products ]
        // noinspection EqualityComparisonWithCoercionJS
        return (
            <React.Fragment>
                <select className="custom-select product-category-select" value={this.state.currentCategory} onChange={this.handleCategoryChange}>
                    { categories.map((category, i) => <option key={i} value={category.id}>{ category.name }</option>)}
                </select>
                <ProductList products={allProducts.filter(product => product.category_id == this.state.currentCategory)} />
            </React.Fragment>
        )
    }
}
