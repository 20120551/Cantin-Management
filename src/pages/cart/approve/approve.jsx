import './approve.css';
import './../../../assets/css/style.css';
import { CartItem } from './../../../components';

function CartApprove() {
    return (
        <div id="approve">
            <CartItem isApprove={true} />
            <div className="approve-totalMoney">
                <strong>Tổng tiền:</strong>
                <span>150000VND</span>
            </div>
            <div className="approve-form">
                <div className="approve-form__input">
                    <label htmlFor="studentId">Mã số sinh viên</label>
                    <input type="text" id="studentId" name="studentId" placeholder='2012****' />
                </div>
                <div className="approve-form__input">
                    <label htmlFor="studentName">Họ và tên</label>
                    <input type="text" id="studentName" name="studentName" placeholder='Họ và tên' />
                </div>
                <div className="approve-form__timeReceive">
                    <label>Khung giờ</label>
                    <div className="timeReceive">
                        <div className="timeReceive-item">
                            <span>10:30 AM</span>
                        </div>
                        <div className="timeReceive-item">
                            <span>10:30 AM</span>
                        </div>
                        <div className="timeReceive-item">
                            <span>10:30 AM</span>
                        </div>
                        <div className="timeReceive-item">
                            <span>10:30 AM</span>
                        </div>
                        <div className="timeReceive-item">
                            <span>10:30 AM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="exec-approve">
                <button>Đặt ngay</button>
            </div>
        </div>
    )
}

export default CartApprove;