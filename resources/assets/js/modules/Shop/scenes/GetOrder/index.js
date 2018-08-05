import React, { Component } from 'react'
import { connect } from 'react-redux'

import InvoiceCard from '../../components/GetOrder/InvoiceCard'

class GetOrderPage extends Component {

  render(){
      return(
        <InvoiceCard />
      );
  }

}

export default (GetOrderPage)
