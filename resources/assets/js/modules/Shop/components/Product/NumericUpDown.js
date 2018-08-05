import React from 'react'

export default ({ label, value, min = 1, max = 1, onChange = null, onUp = null, onDown = null }) => {
    const increaseHandler = () => {
        if (onUp) {
            onUp()
        } else {
            onChange(Math.min(max, value + 1))
        }
    }
    const decreaseHandler = () => {
        if(value > 1 ){
          if (onDown) {
              onDown()
          } else {
              onChange(Math.max(min, value - 1))
          }
        }
    }
    const button = 'product-option-btn'
    return (
        <div className="btn-group">
            <button type="button" className={button} onClick={decreaseHandler}>-</button>
            <span className={button}>{ value }</span>
            <button type="button" className={button} onClick={increaseHandler}>+</button>
        </div>
    )
}
