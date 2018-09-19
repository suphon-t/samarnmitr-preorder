import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchOrders } from '../api'
import routes from '../../../routes/routes'
import { findItem } from '../../Shop/shopUtils'
import Item from '../../Shop/components/Cart/Item'

class OrderList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            orders: [],
            filteredOrders: [],
            paidOnly: false,
            query: '',
            expandAll: false,
        }

        this.handleExpandAllChange = this.handleExpandAllChange.bind(this)
        this.handlePaidOnlyChange = this.handlePaidOnlyChange.bind(this)
        this.handleQueryChange = this.handleQueryChange.bind(this)
    }

    filterOrders(orders, query, paidOnly) {
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

    handleExpandAllChange(e) {
        this.setState({
            expandAll: e.target.checked,
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
        const { isLoading, filteredOrders, paidOnly, query, expandAll } = this.state
        if (isLoading) {
            return <h1>Loading...</h1>
        }
        const searchBar = (
            <div>
                <input className="form-control" placeholder="Search..." value={query} onChange={this.handleQueryChange} />
                <input type="checkbox" id="paidCheck" checked={paidOnly} onChange={this.handlePaidOnlyChange} />
                <label htmlFor="paidCheck">แสดงเฉพาะจ่ายแล้ว</label>
                <input type="checkbox" id="expandCheck" checked={expandAll} onChange={this.handleExpandAllChange} />
                <label htmlFor="expandCheck">แสดงรายละเอียดทั้งหมด</label>
            </div>
        )
        const { products, sets } = this.props
        const table = expandAll ? filteredOrders.map(order => {
            const cartContents = JSON.parse(order['cart_contents'])
            const entries = cartContents.map(item => ({
                item: item,
                product: findItem(item.info.id, products, sets),
            }))
            return <div className="order-list-item" key={order.user_id}>
                { this.props.isProductsLoading ? null : (
                    <div>
                        <div className="status-divider"/>
                        <div className="cart-container">
                            <h3 className="cart-items-title">
                                <Link to={routes.manage.orderStatus.get({
                                    orderId: order.user_id,
                                    key: order.key,
                                })}>
                                    Order { order.user_id }, Price: { order.total_price }, Identification: { order.identification }
                                </Link>
                            </h3>
                            <div className="cart-items-container">
                                { entries.map((entry, i) => {
                                    const { item, product } = entry
                                    return <Item key={i} product={product} item={item} index={i} forceContents
                                                 onAdd={() => {}} onRemove={() => {}} readOnly />
                                }) }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        }) : (
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
    user: state.user,
    isProductsLoading: state.shop.isLoading,
    products: state.shop.products,
    sets: state.shop.sets,
})

export default connect(mapStateToProps)(OrderList)
