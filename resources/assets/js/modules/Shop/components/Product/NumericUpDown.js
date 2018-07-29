import React from 'react'

export default ({ label, value, min = 1, max = 1, onChange }) => {
    const increaseHandler = () => { onChange(Math.min(max, value + 1)) }
    const decreaseHandler = () => { onChange(Math.max(min, value - 1)) }
    const button = 'btn btn-lg btn-outline-secondary'
    return (
        <div className="form-group row">
            <label className="col-sm-4 col-form-label product-customization-label">{ label }</label>
            <div className="col-sm-8">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button type="button" className={button} onClick={decreaseHandler}>-</button>
                    </div>
                    <input type="number" className="form-control form-control-lg" value={value} onChange={() => {}} />
                    <div className="input-group-append">
                        <button type="button" className={button} onClick={increaseHandler}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
