import React, { Component } from 'react'
import qs from 'query-string'

import { loadOrderStatus } from '../api'

export default class OrderStatus extends Component {

    constructor(props) {
        super(props)

        const params = qs.parse(this.props.location.search)

        this.state = {
            isLoading: true,
            id: params.id,
            key: params.key,
        }
    }

    componentWillMount() {
        loadOrderStatus(this.state.id, this.state.key)
            .then(response => {
                this.setState({
                    isLoading: false,
                    order: response.data,
                })
            })
            .catch(console.log)
    }

    render() {
        if (this.state.isLoading) return null
        const { order } = this.state
        console.log(order)
        return (
            <div className="col-12">
                <div className="manage-card">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>{ order.id }</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Price</td>
                                    <td>{ order.total_price }</td>
                                </tr>
                                <tr>
                                    <td>Paid</td>
                                    <td>{ order.chargeStatus ? 'Yes' : 'No' }</td>
                                </tr>
                                { order.chargeStatus ? <React.Fragment>
                                    <tr>
                                        <td>Paid amount</td>
                                        <td>{ order.chargeStatus.amount }</td>
                                    </tr>
                                    <tr>
                                        <td>Paid at</td>
                                        <td>{ order.chargeStatus.created_at }</td>
                                    </tr>
                                    <tr>
                                        <td>Payee</td>
                                        <td>{ order.chargeStatus.payee.name }</td>
                                    </tr>
                                </React.Fragment> : null }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
