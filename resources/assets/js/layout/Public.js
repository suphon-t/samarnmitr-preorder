//import libs
import React from 'react'

// import components
import Navigation from '../common/navigation'
import Container from './Container'
import Footer from './Footer'

export default ({ children }) => (
    <div>
        <Navigation />
        <Container>
            { children }
            <Footer />
        </Container>
    </div>
)
