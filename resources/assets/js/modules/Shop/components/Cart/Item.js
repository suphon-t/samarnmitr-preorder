import React from 'react'
import { withLocalize } from 'react-localize-redux'

import NumericUpDown from '../Product/NumericUpDown'
import { getImage } from '../../shopUtils'

export default withLocalize(({ product, item, onAdd, onRemove, translate, readOnly = false, forceContents = false }) => {
    const allCustoms = item.info.customizations
    const customizations = allCustoms[0].values
    const customizationLabels = product.is_set ? [] : Object.keys(customizations).map(name => {
        return translate('shop.customizations.' + name + '.values.' + customizations[name])
    }).join(' ')
    const customizationsSuffix = customizationLabels.length ? '(' + customizationLabels + ')' : null
    return (
        <div className="cart-item-background">
            <div className="cart-item">
                <div className="col-auto">
                    <div className="product-pic">
                        <img className="fit-parent" src={getImage(product.id)} />
                    </div>
                </div>
                <div className="col nested">
                    <div className="row nested">
                        <div className="col-12 col-md">
                            <h3 className="product-name hide-desktop">
                                { product.name } { customizationsSuffix }
                            </h3>
                            <h3 className="product-name hide-mobile">{ product.name }</h3>
                            { product.is_set ? null : Object.keys(customizations).map((name, i) => (
                                <p key={i} className="product-customization hide-mobile">
                                    { translate('shop.customizations.' + name + '.title') + ': ' }
                                    { translate('shop.customizations.' + name + '.values.' + customizations[name]) }
                                </p>
                            )) }
                        </div>
                        { readOnly ? (
                                <div className="col col-md-auto amount-text">
                                    { translate('shop.cart.amount_text', { amount: item.amount }) }
                                </div>
                            ) : (
                                <div className="col col-md-auto">
                                    <div className="row nested justify-content-end">
                                        <div className="col-auto hide-mobile">
                                            <h3 className="cart-item-label">{ translate('shop.amount') }</h3>
                                        </div>
                                        <div className="col-auto">
                                            <NumericUpDown value={item.amount} onUp={() => onAdd(item.info)} onDown={() => onRemove(item.info)} />
                                            <button className="product-option-btn pink cart-delete-mobile hide-desktop"
                                                    onClick={() => onRemove(item.info, item.amount)}>X</button>
                                        </div>
                                        <div className="col-auto hide-mobile">
                                            <button className="cart-delete" onClick={() => onRemove(item.info, item.amount)}>
                                                { translate('shop.cart.remove') }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            { product.is_set ? product.contents.map((content, i) => {
                let className = 'cart-item small'
                if (!forceContents) {
                    className += ' hide-mobile'
                }
                if (!i) {
                    className += ' first'
                }
                return (
                    <div key={i} className={className}>
                        <div className="col">
                            <h3 className="product-name">{ content.name }</h3>
                            { Object.keys(allCustoms[i].values).map(name => (
                                <span key={i} className="product-customization">
                                    { translate('shop.customizations.' + name + '.title') + ': ' }
                                    { translate('shop.customizations.' + name + '.values.' + allCustoms[i].values[name]) }
                                </span>
                            )) }
                        </div>
                    </div>
                )
            }) : null }
        </div>
    )
})
