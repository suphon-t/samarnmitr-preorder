import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'

import { addItem, removeItem } from '../../store/actions'

class Cart extends Component {

    render() {
        const { products, cart } = this.props
        return (
            <div className="cart-card">
                <h1 className="cart-title">Your Cart</h1>
                <div className="cart-divider" />
                <div className="cart-items-container">
                    { cart.items.map((item, i) => {
                        const product = products.find(it => it.id === item.info.id)
                        return <Item key={i} product={product} item={item}
                                     onAdd={this.props.addItem} onRemove={this.props.removeItem} />
                    }) }
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
