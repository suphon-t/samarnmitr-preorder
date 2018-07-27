import React from 'react'

export default ({ style, children }) => (
    <main className="container" style={style}>
        <div className="row justify-content-center">
            { children }
        </div>
    </main>
)

