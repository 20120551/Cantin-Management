const {RandomNumber} = require('./../Utils/handleData');

//send email with key
module.exports.activateMail = (payload)=> {
    const {email} = payload;
    const key = RandomNumber(6);
    const data = {
        from: 'vinhphucit02@gmai.com',
        to: email,
        subject: 'Kích hoạt tài khoản của bạn',
        html: 
        (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                
            </head>
            <body>
                <div class="container" style="width: 50%;height: 100%;margin: 0 auto;box-shadow: 3px 3px 3px black;">
                    <div class="header" style="width: 100%;display: flex;">
                        <img src="https://ipos.vn/wp-content/uploads/2021/10/canteen-taicho.jpg" alt="background canteen" style="width: 100%;height: 250px;">
                    </div>
                    <div class="content">
                        <div class="title">
                            <h3 class="title-header" style="text-align: center;font-size: 26px;">Chào mừng bạn đã đến với hocmai.vn</h3>
                        </div>
                        <div class="description" style="margin: -10px 0 0 30px;">
                            <p>Chào mừng bạn đã đến canteen trường đại học khoa học tự nhiên</p>
                            <p>Đến với dịch vụ canteen online, bạn sẽ được:</p>
                            <ul>
                                <li>Trải nghiệm dịch vụ mua bán online 1 cách tốt nhất</li>
                                <li>Nhanh chống nhận được thức ăn ở giờ cao điểm</li>
                                <li>Hỗ trợ đặt hàng thanh toán online</li>
                            </ul>
                            <p>Hãy kích hoạt tài khoản để trải nghiệm dịch vụ.</p>
                        </div>
                        <div class="active-account" style="background-color: red;width: 20%;margin: 0 auto;padding: 1px 0;border-radius: 5px;">
                            <h2 style="text-align: center;font-size: 20px;color: white;">${key}</h2>
                        </div>
                    </div>
                    <div class="footer" style="background-color: rgb(242, 164, 9);margin-top: 30px;height: 80px;">
                        <div class="copy-right" style="margin-left: 30px; margin-top: 10px;display: inline-block;">
                            <p style="color: white;font-size: 10px;">@${email}, when ${new Date}</p>
                            <p style="color: white;font-size: 10px;">Hệ thống canteen HCMUS</p>
                        </div>
                        <div class="redirect-media" style="margin-right: 30px; margin-top: 10px;display: inline-block;">
                            <a href="hocmai.vn">
                                <img src="https://i.pinimg.com/originals/46/87/36/468736a28a76a005316d52172df86da6.png" alt="" style="border-radius: 50%;width: 40px;height: 40px;margin-left: 320px;">
                            </a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `)
    };

    return {data, key};
}

module.exports.changePassMail = (payload)=> {
    const {
        email,
        currentPassword,
        newPassword
    } = payload;
    const key = RandomNumber(6);
    const data = {
        from: 'vinhphucit02@gmai.com',
        to: email,
        subject: 'Thay đổi mật khẩu',
        html: 
        (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                
            </head>
            <body>
                <div class="container" style="width: 50%;height: 100%;margin: 0 auto;box-shadow: 3px 3px 3px black;">
                    <div class="header" style="width: 100%;display: flex;">
                        <img src="https://ipos.vn/wp-content/uploads/2021/10/canteen-taicho.jpg" alt="background canteen" style="width: 100%;height: 250px;">
                    </div>
                    <div class="content">
                        <div class="title">
                            <h3 class="title-header" style="text-align: center;font-size: 26px;">Thay đổi mật khẩu</h3>
                        </div>
                        <div class="description" style="margin: -10px 0 0 30px;">
                            <p>Bạn đã thực hiện thay đổi mật khẩu.</p>
                            <p>Mật khẩu của bạn:</p>
                            <ul>
                                <li>Mật khẩu cũ: ${currentPassword}</li>
                                <li>Mật khẩu mới: ${newPassword}</li>
                            </ul>
                            <p>Vui lòng xác nhận thay đổi mật khẩu với mã bên dưới.</p>
                        </div>
                        <div class="active-account" style="background-color: red;width: 20%;margin: 0 auto;padding: 1px 0;border-radius: 5px;">
                            <h2 style="text-align: center;font-size: 20px;color: white;">${key}</h2>
                        </div>
                    </div>
                    <div class="footer" style="background-color: rgb(242, 164, 9);margin-top: 30px;height: 80px;">
                        <div class="copy-right" style="margin-left: 30px;margin-top: 10px;display: inline-block;">
                            <p style="color: white;font-size: 10px;">@${email}, when ${new Date}</p>
                            <p style="color: white;font-size: 10px;">Hệ thống canteen HCMUS</p>
                        </div>
                        <div class="redirect-media" style="margin-right: 30px;margin-top: 10px;display: inline-block;">
                            <a href="hocmai.vn">
                                <img src="https://i.pinimg.com/originals/46/87/36/468736a28a76a005316d52172df86da6.png" alt="" style="border-radius: 50%;width: 40px;height: 40px;margin-left: 320px;">
                            </a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `)
    };

    return {data, key};
}