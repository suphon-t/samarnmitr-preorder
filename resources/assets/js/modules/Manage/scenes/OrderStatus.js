import React, { Component } from 'react'
import qs from 'query-string'

import { loadOrderStatus, editOrder } from '../api'

export default class OrderStatus extends Component {

    constructor(props) {
        super(props)

        const params = qs.parse(this.props.location.search)

        this.state = {
            isLoading: true,
            isSending: true,
            id: params.id,
            key: params.key,
        }

        this.handleTogglePaidStatus = this.handleTogglePaidStatus.bind(this)
        this.handleToggleReceivedStatus = this.handleToggleReceivedStatus.bind(this)
    }

    componentWillMount() {
        this.reloadStatus()
    }

    reloadStatus() {
        loadOrderStatus(this.state.id, this.state.key)
            .then(response => {
                this.setState({
                    isLoading: false,
                    isSending: false,
                    order: response.data,
                })
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isSending: false,
                    error: error.response.status,
                })
            })
    }

    handleTogglePaidStatus(e) {
        e.preventDefault()

        this.setState({
            isSending: true,
        })

        editOrder({
            id: this.state.id,
            key: this.state.key,
            action: 'togglePaidStatus',
        })
            .then(() => {
                this.reloadStatus()
            })
            .catch(console.log)
    }

    handleToggleReceivedStatus(e) {
        e.preventDefault()

        this.setState({
            isSending: true,
        })

        editOrder({
            id: this.state.id,
            key: this.state.key,
            action: 'toggleReceivedStatus',
        })
            .then(() => {
                this.reloadStatus()
            })
            .catch(console.log)
    }

    render() {
        if (this.state.isLoading) {
            return <h1>Loading...</h1>
        }
        if (this.state.error) {
            return <h1>Error { this.state.error }</h1>
        }
        const { order, isSending } = this.state
        // console.log(order)
        const paidStatusToggler = <button className="btn btn-primary" onClick={this.handleTogglePaidStatus} disabled={isSending}>
            { order.chargeStatus ? 'set as not paid' : 'set as paid' }
            </button>
        const receivedStatusToggler = <button className="btn btn-primary" onClick={this.handleToggleReceivedStatus} disabled={isSending}>
            { order.reception ? 'set as not received' : 'set as received' }
            </button>
        return (
            <div className="col-12">
                <div className="manage-card">
                    <h1>
                        { (order.chargeStatus && order.chargeStatus.status === 'successful') ? 'จ่ายแล้ว ' : 'ยังไม่จ่าย ' }
                        { (order.reception) ? 'รับแล้ว' : 'ยังไม่รับ' }
                    </h1>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>{ order.user_id }</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Price</td>
                                    <td>{ order.total_price }</td>
                                </tr>
                                <tr>
                                    <td>Paid</td>
                                    <td>
                                        { order.chargeStatus ? 'Yes' : 'No' }
                                        { (!order.chargeStatus || order.chargeStatus.payee.name !== 'Omise')
                                            ? paidStatusToggler : null }
                                    </td>
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
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Received</td>
                                    <td>
                                        { order.reception ? 'Yes' : 'No' }
                                        { receivedStatusToggler }
                                    </td>
                                </tr>
                                { order.reception ? <React.Fragment>
                                    <tr>
                                        <td>Received at</td>
                                        <td>{ order.reception.created_at }</td>
                                    </tr>
                                    <tr>
                                        <td>Sender</td>
                                        <td>{ order.reception.sender.name }</td>
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
