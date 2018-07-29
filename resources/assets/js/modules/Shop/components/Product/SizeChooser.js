import React  from 'react'

const normal = 'btn btn-lg btn-outline-secondary'
const active = normal + ' active'

export default ({ value, sizes, onChange }) => {
    if (!sizes) return null
    return (
        <div className="form-group row">
            <label className="col-sm-4 col-form-label product-customization-label">Size</label>
            <div className="col-sm-8">
                <div className="btn-group" role="group">
                    { sizes.map((size, i) => (
                        <button key={i} type="button" className={size === value ? active : normal} onClick={() => {
                            onChange(size)
                        }}>{ size }</button>
                    )) }
                </div>
            </div>
        </div>
    )
}
