import React, { Component } from 'react'
import qs from 'query-string'

import InvoiceCard from '../../components/GetOrder/InvoiceCard'

class GetOrderPage extends Component {

    render() {
        const params = qs.parse(this.props.location.search)
        return (
            <InvoiceCard params={params} />
        );
    }

}

export default (GetOrderPage)
