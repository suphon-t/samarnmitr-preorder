import React from 'react'

export default props => (
    <div className="product-card">
        <div className="product-left-pane">
            <div className="product-slide" />
        </div>
        <div className="product-right-pane">
            <h1 className="product-title">Product Name</h1>
            <div className="product-title-divider" />
            <div className="product-info" />
            <form>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label product-customization-label">Size</label>
                    <div className="col-sm-8">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-lg btn-outline-secondary">S</button>
                            <button type="button" className="btn btn-lg btn-outline-secondary">M</button>
                            <button type="button" className="btn btn-lg btn-outline-secondary">L</button>
                            <button type="button" className="btn btn-lg btn-outline-secondary">XL</button>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label product-customization-label">Amount</label>
                    <div className="col-sm-8">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-lg btn-outline-secondary">-</button>
                            </div>
                            <input type="number" className="form-control form-control-lg" value="0" />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-lg btn-outline-secondary">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <button className="btn btn-lg btn-danger" style={{ marginTop: 'auto' }}>Add to cart</button>
        </div>
    </div>
)
