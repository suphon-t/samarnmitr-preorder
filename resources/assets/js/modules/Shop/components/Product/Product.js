import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../routes/routes'

export default props => {
    const { product } = props
    return (
        <Link className="product-card" to={routes.shop.detail.get({ productId: product.id })}>
            <div className="product-pic" />
            <div className="product-text">
                { product.name }
            </div>
        </Link>
    )
}
