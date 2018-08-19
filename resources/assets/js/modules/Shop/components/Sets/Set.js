import React from 'react'
import { Link } from 'react-router-dom'

import routes from '../../../../routes/routes'
import { getImage } from '../../shopUtils'

export default props => {
    const { set } = props
    return (
        <Link className="set-card" to={routes.shop.detail.get({ productId: set.id })}>
            <div className="set-pic">
                <img className="fit-parent" src={getImage(set.id)} />
            </div>
            <div className="set-text">
                { set.name }
            </div>
        </Link>
    )
}
