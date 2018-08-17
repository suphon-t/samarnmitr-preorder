import React,{ Component} from 'react';
import ReactDOM from 'react-dom';

class StatusFooter extends Component{

    render(){
        const mode=this.props.value;

        if(mode===0){
            return(
                <div className="col-auto">
                    <button id="printBtn" > ออกจากระบบ </button>
                </div>
            );
        }
        else{
            return(
                <div className="row">
                    <div className="col-1"/>
                    <div className="col">
                        <button id="printBtn" > พิมพ์รายการสั่งซื้อ </button>
                    </div>
                    <div className="col">
                        <button id="printBtn" > ออกจากระบบ </button>
                    </div>
                    <div className="col-1"/>
                </div>
            );
        }
    }

}

class StatusCard extends Component{

  render(){
    const orderID = '001';
    var i=this.props.value;
    const statusPlate=["order-not-paid","order-paid"];
    const status =[
      "กำลังตรวจสอบการชำระเงิน",
      "สำเร็จ"
    ];
    var currstatus=status[this.props.value];
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
        <div className={statusPlate[i]} >
            {currstatus}
        </div>
        <div className="order-status-footer">
            <StatusFooter value={i}/>
        </div>

      </div>

    );
  }


}


export default StatusCard
