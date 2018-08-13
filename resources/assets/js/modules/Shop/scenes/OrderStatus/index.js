import React, { Component } from 'react'
import { connect } from 'react-redux'

import StatusCard from '../../components/OrderStatus/StatusCard'

class OrderStatusPage extends Component {
  constructor(props){
    super(props);
    this.state={
      value:1,
    }
  }
  render(){
      return(
        <div>
          <StatusCard value={this.state.value}/>
            <button onClick={()=> {this.setState({
              value:(this.state.value+1)%2
            })
            } }> {this.state.value} </button>
        </div>
      );
  }

}


export default (OrderStatusPage)
