import React from 'react'

import Divider from '../Divider'
import Product from './Product'

export default ({ recommendations }) => (
    <React.Fragment>
        <div className="recommended-list hide-mobile">
            <h1 className="title">Recommended items</h1>
            <Divider className="recommendation-divider" />
        </div>
        <div className="products-container hide-mobile">
            { recommendations.map((product, i) => <Product key={i} product={product} />) }
        </div>
    </React.Fragment>
)
