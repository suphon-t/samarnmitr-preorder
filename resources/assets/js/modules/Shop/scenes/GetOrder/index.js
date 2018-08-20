import React, { Component } from 'react'
import qs from 'query-string'

import InvoiceCard from '../../components/GetOrder/InvoiceCard'
import Cover from '../../components/Cover'

class GetOrderPage extends Component {

    render() {
        const params = qs.parse(this.props.location.search)
        return (
            <React.Fragment>
                <Cover />
                <div className="get-order-page">
                    <div className="thank-you-art" />
                    <InvoiceCard params={params} />
                </div>
            </React.Fragment>
        );
    }

}

export default (GetOrderPage)
