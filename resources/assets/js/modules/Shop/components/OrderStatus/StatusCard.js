import React,{ Component} from 'react';
import ReactDOM from 'react-dom';


class StatusCard extends Component{


  render(){
    const orderID = '001';
    var i=this.props.value;
    const statusPlate=document.getElementById("statusPlate");
    const printBtn=document.getElementById("printBtn");
    const status =[
      "กำลังตรวจสอบการชำระเงิน",
      "สำเร็จ"
    ];
    var currstatus=status[this.props.value];
    if(i===0&&statusPlate){
      statusPlate.classList.remove("order-not-paid","order-paid");
      printBtn.classList.remove("btn-disabled","btn-enabled");
      statusPlate.classList.add("order-not-paid");
      printBtn.classList.add("btn-disabled");
    }
    else if(i===1&&statusPlate){
      statusPlate.classList.remove("order-not-paid","order-paid");
      printBtn.classList.remove("btn-disabled","btn-enabled");
      statusPlate.classList.add("order-paid");
      printBtn.classList.add("btn-enabled");
    }
    return(
      <div className="order-status-card">
        <div className="order-id-container">
          <div className="row">
            <div className="col-3">Order ID</div>
            <div className="col-6 order-id"> {orderID}</div>
          </div>
        </div>
        <div className="status-divider"/>
         สถานะการดำเนินการ
        <div id="statusPlate" >
          {currstatus}
        </div>
        <div className="order-status-footer">
          <button id="printBtn" disabled={i==0} > พิมพ์รายการสั่งซื้อ </button>
        </div>

      </div>

    );
  }


}


export default StatusCard
