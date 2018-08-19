import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addItem } from '../../store/actions'

import DropdownCustomizer from './DropdownCustomizer'
import NumericUpDown from './NumericUpDown'
import routes from '../../../../routes/routes'
import ProductSlide from './ProductSlide'

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 1,
            customizations: this.props.product.contents[0].customizations.reduce((acc, curr) => {
                return {
                    ...acc,
                    [curr.name]: curr.default.name,
                }
            }, {}),
        }
        this.handleCustomizationChange = this.handleCustomizationChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }

    handleCustomizationChange(name, value) {
        this.setState({
            customizations: {
                ...this.state.customizations,
                [name]: value,
            },
        })
    }

    getChangeHandler(name) {
        return e => this.handleCustomizationChange(name, e.target.value)
    }

    handleAmountChange(amount) {
        this.setState({ amount })
    }

    addToCart() {
        const { product, history } = this.props
        const { customizations, amount } = this.state
        const pivotId = product.contents[0].pivot.id
        const info = {
            id: product.id,
            customizations: [
                {
                    pivotId,
                    values: customizations,
                },
            ],
        }
        this.props.addItem(info, amount)
        history.push(routes.shop.cart.get())
    }

    render() {
        const { translate } = this.props
        const product = this.props.product.contents[0]
        const customizationsUnfinished = product.customizations
            .find(customization => this.state.customizations[customization.name] === undefined)
        return (
            <div className="product-detail-card">
                <div className="row">
                    <div className="product-left-pane">
                        <div className="product-slide">
                            <ProductSlide product={product} />
                        </div>
                    </div>
                    <div className="product-right-pane">
                        <h1 className="product-title hide-mobile">{ product.name }</h1>
                        <div className="product-title-divider hide-mobile" />
                        <div className="strip product-name-strip hide-desktop">
                            <div className="common-panel">
                                <h1>{ product.name }</h1>
                            </div>
                        </div>
                        <div className="product-info" > {product.description} </div>
                        <form>
                            { product.customizations.map((customization, j) => {
                                return (
                                    <div key={j} className="form-group row">
                                        <label className="col-4 col-form-label product-customization-label">
                                            { translate('shop.customizations.' + customization.name + '.title') }
                                        </label>
                                        <div className="col-8">
                                            <DropdownCustomizer key={j} customization={customization} className="form-control-lg"
                                                                value={this.state.customizations[customization.name]}
                                                                onChange={this.getChangeHandler(customization.name)} />
                                        </div>
                                    </div>
                                )
                            }) }
                            <div className="form-group row">
                                <label className="col-4 col-form-label product-customization-label">
                                    { translate('shop.amount') }
                                </label>
                                <div className="col-8">
                                    <NumericUpDown value={this.state.amount} onChange={this.handleAmountChange} />
                                </div>
                            </div>
                        </form>
                        <div className="product-price">
                            <h1>{ translate('shop.price_thb', { price: product.price }) }</h1>
                        </div>
                        <button className="btn btn-lg btn-danger" disabled={customizationsUnfinished} onClick={this.addToCart}
                                style={{ marginTop: 'auto' }}>{ translate('shop.addToCart') }</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    addItem
}

export default withLocalize(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail)))
