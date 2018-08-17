import React,{ Component} from 'react';
import { withRouter } from 'react-router-dom'

import routes from '../../../../routes/routes'

class StatusFooter extends Component {

    doLogout() {
        this.props.history.push(routes.auth.logout.get())
    }

    render(){
        const mode=this.props.value;
        const { id, key } = this.props.order

        const qrCodeTarget = 'http://192.168.10.228:3000/manage/orderStatus/?id=' + id + '&key=' + key
        const qrCodeReq = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=' +
            encodeURIComponent(qrCodeTarget)
        const qrCode = (
            <div className="qr-pic hide-desktop">
                <img className="fit-parent" src={qrCodeReq} />
            </div>
        )

        if(mode===0){
            return(
                <React.Fragment>
                    <div className="small-text">
                        คณะกรรมการนักเรียนกำลังตรวจสอบรายการชำระเงินของท่าน<br/>
                        กรุณาตรวจสอบสถานะการดำเนินการของท่านอีกครั้งในภายหลัง
                        { qrCode }
                    </div>
                    <div className="col-auto">
                        <button id="printBtn" onClick={() => this.doLogout()} > ออกจากระบบ </button>
                    </div>
                </React.Fragment>
            );
        }
        else{
            return(
                <React.Fragment>
                    <div className="qr-detail hide-desktop">
                        โปรดแสดงหน้านี้เพื่อรับสินค้า<br/>
                        ที่ห้องคณะกรรมการนักเรียน<br/>
                        ในวันที่ 20-21 กันยายน พ.ศ. 2561
                        { qrCode }
                    </div>
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col hide-mobile">
                            <button id="printBtn" > พิมพ์รายการสั่งซื้อ </button>
                        </div>
                        <div className="col">
                            <button id="printBtn" onClick={() => this.doLogout()} > ออกจากระบบ </button>
                        </div>
                        <div className="col-1"/>
                    </div>
                </React.Fragment>
            );
        }
    }

}

class StatusCard extends Component{

  render(){
    const orderID = this.props.id;
    var i=this.props.value;
    const statusPlate=["order-not-paid","order-paid"];
    const status =[
      "กำลังตรวจสอบการชำระเงิน",
      "สำเร็จ"
    ];
    var currstatus=status[this.props.value];
    return(
        <div className="order-status-card">
            <div className="order-id-container container hide-mobile">
                <div className="row">
                    <div className="col-3">Order ID</div>
                    <div className="col-6 order-id"> {orderID}</div>
                </div>
            </div>
            <div className="order-id-container hide-desktop">
                    Order ID
                    <div className="order-id"> {orderID}</div>
            </div>
            <div className="status-divider"/>
                สถานะการดำเนินการ
            <div className={statusPlate[i]} >
                {currstatus}
            </div>
            <div className="order-status-footer">
                <StatusFooter history={this.props.history} value={i} order={this.props.order} />
            </div>

        </div>

    );
  }


}


export default withRouter(StatusCard)
