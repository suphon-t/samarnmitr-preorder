//import libs
import React from 'react'

// import components
import Navigation from '../common/navigation'
import Container from './Container'

const containerStyle = {
    paddingTop: '3.5rem',
    minHeight: '100vh',
}

export default ({ children }) => (
    <div>
        <Navigation/>
        <Container style={containerStyle}>
            { children }
        </Container>
        {/*<Footer/>*/}
    </div>
)
