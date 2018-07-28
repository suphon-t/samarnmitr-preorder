//import libs
import React from 'react'

// import components
import Navigation from '../common/navigation'
import Container from './Container'

export default ({ children }) => (
    <div>
        <Navigation/>
        <Container>
            { children }
        </Container>
        {/*<Footer/>*/}
    </div>
)
