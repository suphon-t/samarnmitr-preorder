import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../routes/routes'

export default props => {
    const { set } = props
    return (
        <Link className="set-card" to={routes.shop.detail.get({ productId: set.id })}>
            <div className="set-pic" />
            <div className="set-text">
                { set.name }
            </div>
        </Link>
    )
}
