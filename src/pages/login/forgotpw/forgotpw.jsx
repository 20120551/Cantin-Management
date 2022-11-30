import { useState } from "react";
import { useNavigate } from "react-router-dom";


import './forgotpw.css';



function ForgotPw() {
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate()
    const handleForgot = async () => {
        // try {
            
        // } catch (error) {
        //     setErrorMessages({name:"email", message: errors.email});
        // }
        navigate("/login/resetpw")
        //setErrorMessages({name:"email", message: errors.email});
      }

    const errors = {
        email: "Email hoặc số điện thoại không hợp lệ",
    };
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    const renderForm = (
        <div className="form">
            <div className="input-container">
              <input type="text" name="uname" placeholder='Email hoặc số điện thoại' required />
              {renderErrorMessage("email")}
            </div>
            <div className="button-container">
              <button className="submit-btn" onClick={handleForgot}>Đặt lại mật khẩu</button>
            </div>
            <div className="login-link" onClick={()=>{
              navigate("/login")
            }}>
              Đăng nhập
            </div>
        </div>
      );
    return ( 
    <div>
        <div className="app">
                <div className="bgimg"></div>
                <div className="login-form">
                    {renderForm}
                </div>
            </div>
    </div> 
    );
}

export default ForgotPw;