import React from 'react'
import { Translate } from 'react-localize-redux'

import NumericUpDown from '../Product/NumericUpDown'

export default ({ product, item, onAdd, onRemove }) => {
    const customizations = item.info.customizations[0].values
    return (
        <Translate>
            {({ translate }) => <React.Fragment>
                <div className="cart-item">
                    <div className="col-md-auto">
                        <div className="product-pic" />
                    </div>
                    <div className="col">
                        <h3 className="product-name">{ product.name }</h3>
                        { product.is_set ? null : Object.keys(customizations).map((name, i) => (
                            <p key={i} className="product-customization">
                                { translate('shop.customizations.' + name + '.title') + ': ' }
                                { translate('shop.customizations.' + name + '.values.' + customizations[name]) }
                            </p>
                        )) }
                    </div>
                    <div className="col-md-auto">
                        <h3 className="cart-item-label">{ translate('shop.amount') }</h3>
                    </div>
                    <div className="col-md-auto">
                        <NumericUpDown value={item.amount} onUp={() => onAdd(item.info)} onDown={() => onRemove(item.info)} />
                    </div>
                    <div className="col-md-auto">
                        <button className="cart-delete" onClick={() => onRemove(item.info, item.amount)}>
                            { translate('shop.cart.remove') }
                        </button>
                    </div>
                </div>
                { product.is_set ? product.contents.map((content, i) => {
                    let className = 'cart-item small'
                    if (!i) {
                        className += ' first'
                    }
                    return (
                        <div key={i} className={className}>
                            <div className="col">
                                <h3 className="product-name">{ content.name }</h3>
                                { Object.keys(item.info.customizations[i].values).map((name, i) => (
                                    <span key={i} className="product-customization">
                                        { translate('shop.customizations.' + name + '.title') + ': ' }
                                        { translate('shop.customizations.' + name + '.values.' + customizations[name]) }
                                    </span>
                                )) }
                            </div>
                        </div>
                    )
                }) : null }
            </React.Fragment> }
        </Translate>
    )
}
