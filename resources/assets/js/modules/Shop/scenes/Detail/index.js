import React from 'react'

import Divider from '../../components/Divider'
import ProductDetail from '../../components/Product/ProductDetail'
import RecommendedList from '../../components/Product/RecommendedList'

export default () => (
    <div className="full-width">
        <ProductDetail />
        <Divider />
        <RecommendedList />
    </div>
)
