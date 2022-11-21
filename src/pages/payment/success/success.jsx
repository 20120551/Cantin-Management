import './success.css';
import './../../../assets/css/style.css';
import icons from '../../../assets/icons';

function PaySuccess() {
    return (
        <div id="paySuccess">
            <div className="header">
                <div className="sub">
                    <h3>CANTEEN HCMUS</h3>
                </div>
            </div>
            <div className="content">
                <div className="title">
                    <img src={icons.success} alt="" className="title-icon" />
                    <h3 className="title-header">Mua hàng thành công</h3>
                </div>
                <div className="description">
                    <div className="notification">
                        <h3>Thông báo</h3>
                        <div className="notification-content">
                            <p>Bạn đã thanh toán đơn hàng thành công thông qua ứng dung HCMUS Canteen, vui lòng kiểm tra lại
                                các thông tin bến dưới
                            </p>
                        </div>
                    </div>
                    <div className="student">
                        <h3>Thông tin cá nhân</h3>
                        <div className="student-content">
                            <p>Mã đơn hàng: <strong>US21612</strong></p>
                            <p>Họ & tên: <strong>Trần Vĩnh Phúc</strong></p>
                            <p>MSSV: <strong>20120551</strong></p>
                            <p>Thời gian nhận: <strong>10h30</strong></p>
                        </div>
                    </div>
                    <div className="order">
                        <h3>Thông tin đơn hàng</h3>
                        <div className="order-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Loại món</th>
                                        <th>Tên đơn hàng</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Alfreds Futterkiste</td>
                                        <td>Maria Anders</td>
                                        <td>Germany</td>
                                        <td>Germany</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Tổng tiền</strong></td>
                                        <td colSpan="3">100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="copy-right">
                    <p>@Username, when 2022</p>
                    <p>Canteen HCMUS</p>
                </div>
                <div className="redirect-media">
                    <a href="hcmus.vn">
                        <img src={require('./../../../assets/images/HcmusLogo.png')}
                            alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PaySuccess;