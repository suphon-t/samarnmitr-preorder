import React,{ Component} from 'react';
import ReactDOM from 'react-dom';


class StatusCard extends Component{

  render(){
    const orderID = '001';
    var i=0;
    var statusPlate=document.getElementById("statusPlate");
    const status =[
      "ยังไม่ได้ส่งหลักฐานการโอนเงิน",
      "อยู่ระหว่างการตรวจสอบ",
      "สำเร็จ"
    ];
    var currstatus=status[i];
    if(i===0&&statusPlate){
      statusPlate.classList.add("order-not-paid");
    }
    else if(i===1&&statusPlate){
      statusPlate.classList.add("order-checking");
    }
    else if(i===2&&statusPlate){
      statusPlate.classList.add("order-paid");
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
          <button onClick={()=> {/*color change*/
                statusPlate.classList.remove("order-not-paid","order-checking","order-paid");
                i=(i+1)%3;
                currstatus=status[i];
                if(i===0&&statusPlate){
                  statusPlate.classList.add("order-not-paid");
                }
                else if(i===1&&statusPlate){
                  statusPlate.classList.add("order-checking");
                }
                else if(i===2&&statusPlate){
                  statusPlate.classList.add("order-paid");
                }
              }}/>
      </div>

    );
  }


}


export default StatusCard
