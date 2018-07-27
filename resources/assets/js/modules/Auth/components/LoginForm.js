import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReeValidate from 'ree-validate'

import { login } from '../service'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        })
        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            loading: false,
            errors: this.validator.errors
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeHandler(name) {
        return async e => {
            const { errors } = this.validator

            this.setState({
                credentials: {
                    ...this.state.credentials,
                    [name]: e.target.value
                }
            })

            await this.validator.validate(name, e.target.value)
            this.setState({ errors })
        }
    }

    async handleSubmit(e) {
        e.preventDefault()
        const { credentials } = this.state
        const { errors } = this.validator

        this.setState({ loading: true })

        if (await this.validator.validateAll(credentials)) {
            this.submit(credentials)
        } else {
            this.setState({ errors })
        }

        this.setState({ loading: false })
    }

    submit(credentials) {
        this.props.dispatch(login(credentials))
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                } else if (statusCode === 401) {
                    errors.add('password', error);
                }

                this.setState({ errors })
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp" autoFocus
                           value={this.state.email} placeholder="Enter email" onChange={this.changeHandler("email")} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control"
                           value={this.state.password} placeholder="Password" onChange={this.changeHandler("password")} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={this.state.loading}>Submit</button>
            </form>
        )
    }
}

export default connect(() => { return {} })(LoginForm)
