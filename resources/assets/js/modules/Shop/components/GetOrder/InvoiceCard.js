import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom'

import routes from '../../../../routes/routes'

class InvoiceCard extends Component {

    render() {
        const { id, key } = this.props.params
        const { history } = this.props
        return(
            <div className="get-order-card" >
                <p>Your Order ID is</p>
                <p className="get-order-userdata">{ id }</p>
                <p>Password</p>
                <p className="get-order-userdata">{ key }</p>
                <div className="get-order-payment">
                    <p>
                        กรุณาบันทึกชื่อผู้ใช้งานและรหัสผ่านที่ท่านได้รับ<br/>
                        เมื่อท่านออกจากหน้านี้จะไม่สามารถย้อนกลับได้<br/>
                    </p>
                    กรุณาใช้ชื่อผู้ใช้งานและรหัสผ่านนี้ล็อกอินเข้าสู่ระบบเพื่อตรวจสอบสถานะการชำระเงิน
                </div>
                <button onClick={()=>history.push(routes.auth.login.get())}>
                    LOG IN
                </button>
            </div>
        );
    }

}

export default withRouter(InvoiceCard)
