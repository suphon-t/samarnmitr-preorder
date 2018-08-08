import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { withRouter , Link } from 'react-router-dom'

import routes from '../../../../routes/routes'

import Item from './Item'
import { addItem, removeItem } from '../../store/actions'

class Cart extends Component {

    render() {
        const { history }=this.props;
        const { products, cart, translate } = this.props
        const entries = cart.items.map(item => ({
            item: item,
            product: products.find(it => it.id === item.info.id),
        }))
        const { totalAmount, totalPrice } = entries.reduce((acc, entry) => {
            const { item, product } = entry
            return {
                totalAmount: acc.totalAmount + item.amount,
                totalPrice: acc.totalPrice + item.amount * product.price,
            }
        }, { totalAmount: 0, totalPrice: 0 })
        return (
            <div className="cart-card">
                <h1 className="cart-title">Your Cart</h1>
                <div className="cart-divider" />
                { totalAmount > 0 ? (
                    <React.Fragment>
                        <div className="cart-items-container">
                            { entries.map((entry, i) => {
                                const { item, product } = entry
                                return <Item key={i} product={product} item={item}
                                             onAdd={this.props.addItem} onRemove={this.props.removeItem} />
                            }) }
                        </div>
                        <div className="cart-summary">
                            <table>
                                <tbody>
                                <tr>
                                    <th>{ translate('shop.cart.total_amount') }</th>
                                    <td>{ translate('shop.cart.total_amount_value', { amount: totalAmount }) }</td>
                                </tr>
                                <tr>
                                    <th>{ translate('shop.cart.total_price') }</th>
                                    <td>{ translate('shop.cart.total_price_value', { price: totalPrice }) }</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>
                ) : null}

                <div className="cart-footer">

                    <button disabled={totalAmount <= 0} onClick={()=>{ if(confirm("เลือกสินค้าเรียบร้อยแล้วใช่หรือไม่?")) history.push(routes.shop.getOrder.get())} }>
                      { translate('shop.cart.confirm') }
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.shop.products,
    cart: state.shop.cart,
})

const mapDispatchToProps = {
    addItem,
    removeItem,
}

export default withRouter(withLocalize(connect(mapStateToProps, mapDispatchToProps)(Cart)))
