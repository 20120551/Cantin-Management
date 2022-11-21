import './payment.css';
import './../../../assets/css/style.css';
import icons from './../../../assets/icons';
function Payment() {
    return (
        <div id="payment">
            <div className="payment-side">
                <div className="payment-side__valid">
                    <h4>Đơn hàng hết hạn sau</h4>
                    <p>09:53</p>
                </div>
                <div className="payment-side__supplier">
                    <h4>Nhà cung cấp</h4>
                    <p>Canteen hcmus</p>
                </div>
                <div className="payment-side__totalMoney">
                    <h4>
                        <img src={icons.bill} alt="" />
                        Số tiền
                    </h4>
                    <p>20.000đ</p>
                </div>
                <div className="payment-side__order">
                    <h4>
                        <img src={icons.order} alt="" />
                        Đơn hàng
                    </h4>
                    <p>US24612</p>
                </div>
                <div className="payment-side__state">
                    <h4>
                        <img src={icons.order} alt="" />
                        Trạng thái
                    </h4>
                    <p>Waiting</p>
                </div>
                {/* viết thêm 1 api cho phép xóa order theo id vẫn giữ cart id trong cookie */}
                <div className="payment-side__back">
                    <img src={icons.back} alt="" />
                    Quay lại
                </div>
            </div>
            <div className="payment-container">
                <div className="payment-container__header">
                    <img src={require('./../../../assets/images/HcmusLogo.png')} alt="" />
                    <img src={require('./../../../assets/images/Stripe.png')} alt="" />
                </div>
                <div className="payment-container__content">
                    <h4>Quét mã để thanh toán</h4>
                    <img src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code.jpg" alt="" />
                    <p>
                        Sử dụng App <strong>Stripe</strong> để thanh toán
                    </p>
                    <p>Ứng dụng hỗ trợ Camera hỗ trợ QR code để quét mã.</p>
                    <div className="waiting">
                        <div className="loader"></div>
                        Đang chờ bạn quét ...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;