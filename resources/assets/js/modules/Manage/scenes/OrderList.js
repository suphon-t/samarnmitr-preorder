import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchOrders } from '../api'
import routes from '../../../routes/routes'

class OrderList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            orders: [],
            filteredOrders: [],
            paidOnly: false,
            query: '',
        }

        this.handlePaidOnlyChange = this.handlePaidOnlyChange.bind(this)
        this.handleQueryChange = this.handleQueryChange.bind(this)
    }

    filterOrders(orders, query, paidOnly) {
        console.log(paidOnly)
        if (!query) {
            if (paidOnly) {
                return orders.filter(order => order.local_charge_id !== null)
            }
        }
        return orders.filter(order => {
            if (paidOnly && order.local_charge_id === null) return false
            return ('' + order.user_id).search(new RegExp(query, "i")) !== -1 ||
                ('' + order.identification).search(new RegExp(query, "i")) !== -1
        })
    }

    handlePaidOnlyChange(e) {
        this.setState({
            paidOnly: e.target.checked,
            filteredOrders: this.filterOrders(this.state.orders, this.state.query, e.target.checked),
        })
    }


    handleQueryChange(e) {
        this.setState({
            query: e.target.value,
            filteredOrders: this.filterOrders(this.state.orders, e.target.value, this.state.paidOnly),
        })
    }

    componentWillMount() {
        fetchOrders()
            .then(result => {
                this.setState({
                    isLoading: false,
                    orders: result.data,
                    filteredOrders: this.filterOrders(result.data),
                })
            })
    }

    render() {
        const { isLoading, filteredOrders, paidOnly, query } = this.state
        if (isLoading) {
            return <h1>Loading...</h1>
        }
        const searchBar = (
            <div>
                <input className="form-control" placeholder="Search..." value={query} onChange={this.handleQueryChange} />
                <input type="checkbox" id="paidCheck" checked={paidOnly} onChange={this.handlePaidOnlyChange} />
                <label htmlFor="paidCheck">แสดงเฉพาะจ่ายแล้ว</label>
            </div>
        )
        const table = (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Identification</th>
                    <th>Price</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                { filteredOrders.map(order => {
                    return <tr key={order.user_id}>
                        <td>{ order.user_id }</td>
                        <td>{ order.identification }</td>
                        <td>{ order.total_price }</td>
                        <td><Link to={routes.manage.orderStatus.get({
                            orderId: order.user_id,
                            key: order.key,
                        })}>Detail</Link></td>
                    </tr>
                }) }
                </tbody>
            </table>
        )
        return (
            <div className="col-12">
                <div className="manage-card">
                    { searchBar }
                    { table }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(OrderList)
