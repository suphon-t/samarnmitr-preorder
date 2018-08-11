import React,{ Component} from 'react';
import ReactDOM from 'react-dom';

class InvoiceCard extends Component {

    render() {
        const { id, key } = this.props.params
        return(
            <div className="get-order-card" >
                <p>Your Order ID is</p>
                <p className="get-order-userdata">{ id }</p>
                <p>Password</p>
                <p className="get-order-userdata">{ key }</p>
                <div className="get-order-payment">
                    Payment Method<br/>
                    Account No.: <br/>
                </div>
            </div>
        );
    }

}

export default InvoiceCard
