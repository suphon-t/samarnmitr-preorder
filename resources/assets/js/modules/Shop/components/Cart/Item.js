import React from 'react'

export default ({ product, item, onAdd, onRemove }) => (
    <div className="cart-item">
        <div className="col-md-auto">
            <div className="product-pic" />
        </div>
        <h3 className="product-name">{ product.name }</h3>
        <button onClick={() => onRemove(item.info)}>-</button>
        { item.amount }
        <button onClick={() => onAdd(item.info)}>+</button>
        <button onClick={() => onRemove(item.info, item.amount)}>remove</button>
    </div>
)
