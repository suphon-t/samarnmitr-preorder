import React,{ Component} from 'react';
import ReactDOM from 'react-dom';

class InvoiceCard extends Component {
  render(){
    const InvoiceID = 1010101;
    const Pass = (Math.random()*10).toString(36).substring(2,20) ;
    return(
      <div className="get-order-card" >
        <p>Your Order ID is</p>
        <p className="get-order-userdata">{InvoiceID}</p>
        <p>Password</p>
        <p className="get-order-userdata">{Pass}</p>
        <div className="get-order-payment">
          Payment Method<br/>
          Account No.: <br/>
        </div>
      </div>
    );
  }

}

export default InvoiceCard
