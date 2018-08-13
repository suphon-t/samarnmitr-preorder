import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addItem } from '../../store/actions'

import DropdownCustomizer from './DropdownCustomizer'
import routes from '../../../../routes/routes'
import { findItemFromList } from '../../shopUtils'

class SetDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 1,
            customizations: this.getInitialCustomizations(),
        }
        this.handleCustomizationChange = this.handleCustomizationChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }

    getInitialCustomizations() {
        return this.props.product.contents.map(content => {
            return {
                pivotId: content.pivot.id,
                values: content.customizations.reduce((acc, curr) => {
                    return {
                        ...acc,
                        [curr.name]: curr.default.name,
                    }
                }, {}),
            }
        })
    }

    handleCustomizationChange(index, name) {
        return e => {
            e.preventDefault()
            const value = e.target.value
            this.setState({ customizations: this.setCustomization(index, name, value) })
        }
    }

    setCustomization(index, name, value) {
        return this.state.customizations.map((it, i) => {
            if (i === index) {
                return {
                    pivotId: it.pivotId,
                    values: {
                        ...it.values,
                        [name]: value,
                    },
                }
            } else {
                return it
            }
        })
    }

    getCustomization(index, name) {
        return this.state.customizations[index].values[name]
    }

    handleAmountChange(amount) {
        this.setState({ amount })
    }

    addToCart() {
        const { product, history } = this.props
        const { customizations } = this.state
        const info = {
            id: product.id,
            customizations,
        }
        this.props.addItem(info, 1)
        history.push(routes.shop.cart.get())
    }

    renderContent(content, i) {
        return (
            <div key={i} className="product-preview-container">
                <div className="product-preview">
                    <div className="product-info-container">
                        <div className="product-pic" />
                        <div className="set-panel justify-content-between">
                            <h2 className="product-name">{ content.name }</h2>
                            <form className="form-inline">
                                { content.customizations.map((customization, j) => {
                                    return <DropdownCustomizer key={j} customization={customization}
                                        value={this.getCustomization(i, customization.name)}
                                        onChange={this.handleCustomizationChange(i, customization.name)} />
                                }) }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { translate } = this.props
        const product = this.props.product
        return (
            <div className="set-detail-card">
                <div className="strip">
                    <div className="set-panel">
                        <h1>{ product.name }</h1>
                    </div>
                </div>
                <div className="set-image-container" />
                <div className="strip">
                    <div className="set-panel">
                        <h1>{ translate('shop.buy_set_with_name', { name: product.name }) }</h1>
                    </div>
                    <div className="right-panel">
                        <button className="btn btn-lg btn-danger"
                                onClick={this.addToCart}>{ translate('shop.addToCart') }</button>
                    </div>
                </div>
                <h1 className="customize-title">{ translate('shop.customize_bundle') }</h1>
                <div className="customizations">
                    { product.contents.map((content, i) => {
                        return this.renderContent(content, i)
                    }) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    addItem
}

export default withLocalize(withRouter(connect(mapStateToProps, mapDispatchToProps)(SetDetail)))
