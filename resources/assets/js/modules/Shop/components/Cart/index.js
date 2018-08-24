import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import routes from '../../../../routes/routes'
import { makeOrder } from '../../api'

import Item from './Item'
import { addItem, removeItem, clearCart } from '../../store/actions'
import { findItem } from '../../shopUtils'

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sending: false
        }

        this.handleOrderClick = this.handleOrderClick.bind(this)
    }

    handleOrderClick() {
        if (confirm("เลือกสินค้าเรียบร้อยแล้วใช่หรือไม่?")) {
            this.makeOrder()
        }
    }

    makeOrder() {
        this.setState({ sending: true })
        const { history } = this.props
        const { cart } = this.props
        makeOrder({ email: 'test@example.com', cart })
            .then(result => {
                const { user_id, password } = result.data
                history.push(routes.shop.getOrder.get({ orderId: user_id, key: password }))
                this.props.clearCart()
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ sending: false })
            })
            .finally(() => {
            })
    }

    render() {
        const { products, sets, cart, translate } = this.props
        const entries = cart.items.map(item => ({
            item: item,
            product: findItem(item.info.id, products, sets),
        }))
        const { totalAmount, totalPrice } = entries.reduce((acc, entry) => {
            const { item, product } = entry
            return {
                totalAmount: acc.totalAmount + item.amount,
                totalPrice: acc.totalPrice + item.amount * product.price,
            }
        }, { totalAmount: 0, totalPrice: 0 })
        const buttonDisabled = true // totalAmount <= 0 || this.state.sending
        return (
            <div className="cart-card">
                <div className="cart-title strip">
                    <div className="cart-panel">
                        <h1>Your Cart</h1>
                    </div>
                </div>
                <div className="cart-items-container">
                    { totalAmount <= 0 ? (
                        <h1 className="empty-cart-message">Your cart is empty</h1>
                    ) : null }
                    { entries.map((entry, i) => {
                        const { item, product } = entry
                        return <Item key={i} product={product} item={item} index={i}
                                     onAdd={this.props.addItem} onRemove={this.props.removeItem} />
                    }) }
                </div>
                <div className="cart-summary">
                    <table className="hide-mobile">
                        <tbody>
                        <tr>
                            <th>{ translate('shop.cart.total_amount') }</th>
                            <td>{ translate('shop.cart.total_amount_value', { amount: "" + totalAmount }) }</td>
                        </tr>
                        <tr>
                            <th>{ translate('shop.cart.total_price') }</th>
                            <td>{ translate('shop.cart.total_price_value', { price: "" + totalPrice }) }</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="col hide-desktop">
                        <h1 className="summary-label">{ translate('shop.cart.total_amount') }</h1>
                        <h1 className="summary-value">{ translate('shop.cart.total_amount_value',
                            { amount: "" + totalAmount }) }</h1>
                        <h1 className="summary-label">{ translate('shop.cart.total_price') }</h1>
                        <h1 className="summary-value">{ translate('shop.cart.total_price_value',
                            { price: "" + totalPrice }) }</h1>
                        <button className="confirm-button" disabled={buttonDisabled} /*onClick={this.handleOrderClick}*/>
                            { translate('shop.cart.confirm') }
                        </button>
                    </div>
                </div>

                <div className="cart-footer hide-mobile">

                    <button disabled={buttonDisabled} /*onClick={this.handleOrderClick}*/>
                      { translate('shop.cart.confirm') }
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.shop.products,
    sets: state.shop.sets,
    cart: state.shop.cart,
})

const mapDispatchToProps = {
    addItem,
    removeItem,
    clearCart,
}

export default withRouter(withLocalize(connect(mapStateToProps, mapDispatchToProps)(Cart)))
