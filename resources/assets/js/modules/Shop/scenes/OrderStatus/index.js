import React, { Component } from 'react'
import { connect } from 'react-redux'

import StatusCard from '../../components/OrderStatus/StatusCard'

class OrderStatusPage extends Component {

  render(){
      return(<StatusCard />);
  }

}

export default (OrderStatusPage)
