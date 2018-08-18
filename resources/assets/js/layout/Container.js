import React from 'react'

export default ({ children }) => (
    <div className="outer-container">
        <main className="container">
            <div className="row justify-content-center">
                { children }
            </div>
        </main>
    </div>
)
