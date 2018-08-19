import React,{ Component} from 'react';
import { withRouter } from 'react-router-dom'

import routes from '../../../../routes/routes'
import Item from '../Cart/Item'
import {findItem} from "../../shopUtils";

class StatusFooter extends Component {

    doLogout() {
        this.props.history.push(routes.auth.logout.get())
    }

    render(){
        const mode = this.props.value;
        const { id, key } = this.props.order

        const qrCodeTarget = window.location.origin + '/manage/orderStatus/?id=' + id + '&key=' + key
        const qrCodeReq = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=' +
            encodeURIComponent(qrCodeTarget)
        const qrCode = (
            <div className="qr-pic">
                <img className="fit-parent" src={qrCodeReq} />
            </div>
        )

        if (mode === 0) {
            return (
                <React.Fragment>
                    <div className="qr-detail ">
                        <div className="hide-mobile">{ qrCode }</div>
                        นำ QR Code นี้มาชำระเงินที่ห้องคณะกรรมการนักเรียน
                        <p>ภายใน 48 ชั่วโมงหลังจากสั่งซื้อสินค้า</p>
                        <div className="hide-desktop">{ qrCode }</div>
                    </div>
                    <button id="printBtn" onClick={() => this.doLogout()} > ออกจากระบบ </button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="qr-detail ">
                        <div className="hide-mobile">{ qrCode }</div>
                        นำ QR Code นี้มาแสดงเพื่อรับสินค้าที่ห้องคณะกรรมการนักเรียน
                        <p>ในวันที่ 20 - 21 กันยายน 2561</p>
                        <div className="hide-desktop">{ qrCode }</div>
                    </div>
                    <button id="printBtn" onClick={() => this.doLogout()} > ออกจากระบบ </button>

                </React.Fragment>
            )
        }
    }

}

class StatusCard extends Component{

    render() {
        const orderID = this.props.id
        const statusPlate = ['order-not-paid', 'order-paid']
        const status = [
            'รอชำระเงิน',
            'สำเร็จ'
        ]
        const { products, sets, value } = this.props
        const entries = this.props.order.cartContents.map(item => ({
            item: item,
            product: findItem(item.info.id, products, sets),
        }))
        return(
            <div className="order-status-card">
                <div className="order-id-container order-status-text hide-mobile">
                    <div className="row justify-content-center">
                        <div className="col-auto">Order ID</div>
                        <div className="col-6 order-id">
                            { orderID }
                        </div>
                    </div>
                </div>
                <div className="order-id-container order-status-text hide-desktop">
                    Order ID
                    <div className="order-id">{ orderID }</div>
                </div>
                <div className="status-divider"/>
                <div className="cart-container">
                    <h3 className="cart-items-title">รายการสินค้า</h3>
                    <div className="cart-items-container">
                        { entries.map((entry, i) => {
                            const { item, product } = entry
                            return <Item key={i} product={product} item={item} index={i}
                                         onAdd={() => {}} onRemove={() => {}} readOnly />
                        }) }
                    </div>
                </div>
                <p className="order-status-text">
                    สถานะการดำเนินการ
                </p>
                <div className={ statusPlate[value] + ' order-status-text' } >
                    { status[value] }
                </div>
                <div className="order-status-footer order-status-text">
                    <StatusFooter history={this.props.history} value={value} order={this.props.order} />
                </div>

            </div>

        );
    }

}

export default withRouter(StatusCard)
