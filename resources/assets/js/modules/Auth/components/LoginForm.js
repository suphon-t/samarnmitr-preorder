import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from '../service'
import Field from './Field'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            loading: false,
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeHandler(name) {
        return async e => {
            this.setState({
                credentials: {
                    ...this.state.credentials,
                    [name]: e.target.value
                },
                error: null
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault()

        this.submit(this.state.credentials)
    }

    setError(error) {
        this.setState({ error, loading: false })
    }

    submit(credentials) {
        this.setState({ loading: true, error: null })
        this.props.dispatch(login(credentials))
            .catch(({ error, statusCode }) => {
                if (statusCode === 401) {
                    this.setError(error)
                } else {
                    this.setError('internal_error')
                }
            })
    }

    render() {
        const { error } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <Field title="Email address" placeholder="Enter email" autoFocus type="email"
                    value={this.state.email} onChange={this.changeHandler("email")} />
                <Field title="Password" placeholder="Password" type="password" error={error}
                    value={this.state.password} onChange={this.changeHandler("password")} />
                <button type="submit" className="btn btn-primary" disabled={this.state.loading}>Submit</button>
            </form>
        )
    }
}

export default connect(() => { return {} })(LoginForm)
