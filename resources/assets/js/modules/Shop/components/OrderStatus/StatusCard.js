import React,{ Component} from 'react'
import { withRouter } from 'react-router-dom'

import routes from '../../../../routes/routes'
import Item from '../Cart/Item'
import { findItem } from '../../shopUtils'
import { editOrder } from '../../api'

class StatusFooter extends Component {

    doLogout() {
        this.props.history.push(routes.auth.logout.get())
    }

    render() {
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
                        หากต้องการชำระด้วยการโอน ให้โอนเงินไปที่บัญชี<br/>
                        <div className="big-text">ธนาคารกสิกรไทย เลขที่บัญชี 043-1-84846-5<br/></div>
                        นายเอกพงษ์ หุมแพง และ นายกษิดิศ สุริยอัมพร และ นายชยธร โอตรวรรณะ<br/>
                        <div className="skpink" >ภายใน 48 ชั่วโมงหลังจากสั่งซื้อสินค้า</div>
                        และส่งหลักฐานการโอนเงินพร้อมข้อมูลการสั่งซื้อมาที่<br/>
                        <a href="https://goo.gl/forms/KFhvIdFiCS1PMKpm2">"https://goo.gl/forms/KFhvIdFiCS1PMKpm2" </a>
                        <div className="hide-mobile">{ qrCode }
                            หากต้องการชำระด้วยเงินสดนำ QR Code นี้มาชำระเงินที่ห้องคณะกรรมการนักเรียน<br/>
                            <div className="skpink">ภายใน 48 ชั่วโมงหลังจากสั่งซื้อสินค้า</div>
                        </div>
                        <div className="hide-desktop" style={{ marginTop: 32 }}>
                            หากต้องการชำระด้วยเงินสด<br/>นำ QR Code นี้มาชำระเงินที่<br/>ห้องคณะกรรมการนักเรียน
                            <div className="skpink">ภายใน 48 ชั่วโมงหลังจากสั่งซื้อสินค้า</div>
                            { qrCode }
                        </div>
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

    constructor(props) {
        super(props)

        const { identification } = props.order

        this.state = {
            isSending: false,
            identification: identification ? identification : ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({ identification: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({ isSending: true })

        editOrder({ identification: this.state.identification })
            .then(response => {
                this.setState({ isSending: false })
            })
            .catch(e => {
                alert('Error saving')
                console.log(e)
            })
    }

    render() {
        const { isSending, identification } = this.state
        const orderID = this.props.id
        const statusPlate = ['order-not-paid', 'order-paid', 'order-paid']
        const status = [
            'รอชำระเงิน',
            'สำเร็จ',
            'รับของแล้ว',
        ]
        const { products, sets, value } = this.props
        const entries = this.props.order.cartContents.map(item => ({
            item: item,
            product: findItem(item.info.id, products, sets),
        }))
        const idInputProps = {
            value: identification,
            onChange: this.handleChange,
            disabled: isSending,
        }
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
                { value ? null : (
                    <div className="row identification-row no-gutters">
                        <div className="col-12 col-md-6">
                            <h2 className="id-label-line1">ใส่ข้อมูลยืนยันตัวตน</h2>
                            <h3 className="id-label-line2">(นักเรียน-เลขประจำตัว / ครู-ชื่อนามสกุล)</h3>
                        </div>
                        <div className="col-12 col-md-6 identification-input-container">
                            <form className="form-inline">
                                <input type="text" className="form-control mb-2 mr-sm-2 id-field hide-mobile"
                                       {...idInputProps} />
                                <input type="text" className="form-control form-control-sm id-field hide-desktop"
                                       {...idInputProps} />
                                <button type="submit" className="btn btn-danger mb-2 id-button hide-mobile"
                                        onClick={this.handleSubmit} disabled={isSending}>บันทึก</button>
                                <button type="submit" className="btn btn-danger btn-sm id-button hide-desktop"
                                        onClick={this.handleSubmit} disabled={isSending}>บันทึก</button>
                            </form>
                        </div>
                    </div>
                )}
                <div className="order-status-footer order-status-text">
                    <StatusFooter history={this.props.history} value={value} order={this.props.order} />
                </div>

            </div>

        );
    }

}

export default withRouter(StatusCard)
