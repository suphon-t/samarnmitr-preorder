//import libs
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'

// import services actions
import { fetchUser } from '../modules/Auth/service'

// import components
import PrivateLayout from './Private'
import PublicLayout from './Public'

import thaiTranslations from '../../translations/th.json'

class Layout extends Component {

    constructor(props) {
        super(props)

        this.props.initialize({
            languages: [
                { name: "ภาษาไทย", code: "th" },
            ],
            options: { renderToStaticMarkup: false }
        });
        this.props.addTranslationForLanguage(thaiTranslations, "th");
    }

    componentWillMount() {
        const { isAuthenticated, user } = this.props

        if (isAuthenticated && !user.id) {
            this.props.dispatch(fetchUser())
        }

    }

    render() {
        const { children, ...props } = this.props
        if (this.props.isAuthenticated) {
            return <PrivateLayout {...props}>{children}</PrivateLayout>
        }
        return <PublicLayout {...props}>{children}</PublicLayout>
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user,
    }
}

export default withLocalize(withRouter(connect(mapStateToProps)(Layout)))
