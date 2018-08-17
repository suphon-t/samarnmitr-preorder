import React, { Component } from 'react'
import qs from 'query-string'

import InvoiceCard from '../../components/GetOrder/InvoiceCard'

class GetOrderPage extends Component {

    render() {
        const params = qs.parse(this.props.location.search)
        return (
            <div className="get-order-page">
                <div className="thank-you-art" > Insert art here  </div>
                <InvoiceCard params={params} />
            </div>
        );
    }

}

export default (GetOrderPage)
