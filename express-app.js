const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./src/Router');
const {errorHandlingMDW} = require('./src/Middleware');
const {connectToMongoDb} = require('./src/Database');

// thêm 1 vài middleware pipeline ở đây
module.exports = async function(app) {
    // middleware parse json và req.body
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());

    // middleware cho phép truy cập đến thuộc tính static
    //chưa dùng tới :>>

    // middleware parse cookie
    app.use(cookieParser());

    // middleware cho cors (cho phép tất cả các web khác có thể truy cập vào api của bạn)
    app.use(cors({
        credentials: true,
    }));

    // connect đến database
    await connectToMongoDb();
    
    // khởi tạo router
    router(app);

    // khởi tạo middleware handle lỗi
    app.use(errorHandlingMDW.handleErrorOccurAfterRequest);
}