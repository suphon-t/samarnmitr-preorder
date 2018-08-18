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
            <div className="qr-pic">
                <img className="fit-parent" src={qrCodeReq} />
            </div>
        )

        if(mode===0){
            return(
                <React.Fragment>
                    <div className="qr-detail ">
                        <p className="hide-mobile">{ qrCode }</p>
                        นำ QR Code นี้มาชำระเงินที่ห้องคณะกรรมการนักเรียน
                        <p>ภายใน 48 ชั่วโมงหลังจากสั่งซื้อสินค้า</p>
                        <p className="hide-desktop">{ qrCode }</p>
                    </div>
                    <button id="printBtn" onClick={() => this.doLogout()} > ออกจากระบบ </button>
                </React.Fragment>
            );
        }
        else{
            return(
                <React.Fragment>
                    <div className="qr-detail ">
                        <p className="hide-mobile">{ qrCode }</p>
                        นำ QR Code นี้มาแสดงเพื่อรับสินค้าที่ห้องคณะกรรมการนักเรียน
                        <p>ในวันที่ 20 - 21 กันยายน 2561</p>
                        <p className="hide-desktop">{ qrCode }</p>
                    </div>
                    <button id="printBtn" onClick={() => this.doLogout()} > ออกจากระบบ </button>

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
      "รอชำระเงิน",
      "สำเร็จ"
    ];
    //i=0;
    var currstatus=status[i];
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
