import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'

class CreditCardForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            number: '',
            expireMonth: '',
            expireYear: '',
            security: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeHandler(name) {
        return e => {
            this.setState({
                ...this.state,
                [name]: e.target.value,
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        const card = {
            name: this.state.name,
            number: this.state.number,
            expiration_month: this.state.expireMonth,
            expiration_year: this.state.expireYear,
            security_code: this.state.security,
        }
        Omise.createToken('card', card, (statusCode, response) => {
            console.log(statusCode, response)
        })
    }

    render() {
        const { name, number, expireMonth, expireYear, security} = this.state
        const { translate } = this.props
        return (
            <div className="credit-card-form">
                <div className="col-md-8">
                    <form className="needs-validation" noValidate onSubmit={this.handleSubmit}>
                        <h4 className="mb-3">Payment</h4>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-name">{ translate('shop.checkout.card.name') }</label>
                                <input type="text" className="form-control" id="cc-name" placeholder=""
                                       value={name} onChange={this.changeHandler('name')} required />
                                <small className="text-muted">Full name as displayed on card</small>
                                <div className="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-number">{ translate('shop.checkout.card.number') }</label>
                                <input type="text" className="form-control" id="cc-number" placeholder=""
                                       value={number} onChange={this.changeHandler('number')} required />
                                <div className="invalid-feedback">
                                    Credit card number is required
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-expiration">{ translate('shop.checkout.card.expiration') }</label>
                                <div className="input-group">
                                    <input type="number" className="form-control" id="cc-expiration"
                                           placeholder={translate('shop.checkout.card.exp_month')}
                                           value={expireMonth} onChange={this.changeHandler('expireMonth')} required />
                                    <input type="number" className="form-control" id="cc-expiration"
                                           placeholder={translate('shop.checkout.card.exp_year')}
                                           value={expireYear} onChange={this.changeHandler('expireYear')} required />
                                </div>
                                <div className="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-cvv">{ translate('shop.checkout.card.security_code') }</label>
                                <input type="text" className="form-control" id="cc-cvv" placeholder=""
                                       value={security} onChange={this.changeHandler('security')} required />
                                <div className="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <button className="btn btn-primary btn-lg btn-block" type="submit">
                            { translate('shop.checkout.pay_with_amount', { price: this.props.price }) }
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withLocalize(CreditCardForm)
