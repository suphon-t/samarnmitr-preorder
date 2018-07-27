import React from 'react'

export default props => {
    const { title, ...inputProps } = props
    const className = 'form-control' + (props.error ? ' is-invalid' : '')
    const label = title ? (
        <label>{ title }</label>
    ) : null
    const feedback = props.error ? (
        <div className="invalid-feedback">
            { props.error }
        </div>
    ) : null
    return (
        <div className="form-group">
            { label }
            <input className={className} {...inputProps} />
            { feedback }
        </div>
    )
}
