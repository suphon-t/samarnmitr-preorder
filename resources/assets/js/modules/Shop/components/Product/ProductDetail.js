import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'

import SizeChooser from './SizeChooser'

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = { }
        this.handleSizeChange = this.handleSizeChange.bind(this)
    }

    handleSizeChange(size) {
        this.setState({ size })
    }

    render() {
        const { product, translate } = this.props
        return (
            <div className="product-detail-card">
                <div className="product-left-pane">
                    <div className="product-slide" />
                </div>
                <div className="product-right-pane">
                    <h1 className="product-title">{ product.displayName }</h1>
                    <div className="product-title-divider" />
                    <div className="product-info" />
                    <form>
                        <SizeChooser value={this.state.size} sizes={product.sizes} onChange={this.handleSizeChange} />
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label product-customization-label">Amount</label>
                            <div className="col-sm-8">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button type="button" className="btn btn-lg btn-outline-secondary">-</button>
                                    </div>
                                    <input type="number" className="form-control form-control-lg" value="0" onChange={() => {}} />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-lg btn-outline-secondary">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <button className="btn btn-lg btn-danger" style={{ marginTop: 'auto' }}>{ translate('shop.addToCart') }</button>
                </div>
            </div>
        )
    }
}

export default withLocalize(ProductDetail)
