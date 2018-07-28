import React from 'react'

export default props => {
    const { set } = props
    return (
        <div className="set-card">
            <div className="set-pic" />
            <div className="set-text">
                { set.text }
            </div>
        </div>
    )
}
