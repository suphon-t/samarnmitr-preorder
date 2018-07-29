import React from 'react'

import Product from './Product'

export default props => (
    <div className="products-container">
        { props.products.map((product, i) => (<Product key={i} product={product} />)) }
    </div>
)
