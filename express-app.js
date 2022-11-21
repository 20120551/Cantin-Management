const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const EventEmitter = require('events');
const bodyParser = require('body-parser');

const router = require('./src/Router');
const subscriber = require('./src/Subscriber');
const { errorHandlingMDW } = require('./src/Middleware');
const { connectToMongoDb } = require('./src/Database');
const { DOMAIN, PROTOTYPE, FE_PORT } = require('./src/Config');

const Shedule = require('./src/Schedule');

// thêm 1 vài middleware pipeline ở đây
module.exports = async function (app) {
    // middleware parse json và req.body
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    // middleware cho phép truy cập đến thuộc tính static
    //chưa dùng tới :>>

    // middleware parse cookie
    app.use(cookieParser());

    // middleware cho cors (cho phép tất cả các web khác có thể truy cập vào api của bạn)
    const domain = `${PROTOTYPE}://${DOMAIN}:${FE_PORT}`;
    app.use(cors({
        origin: domain,
        credentials: true,
    }));

    // connect đến database
    await connectToMongoDb();

    // khởi tạo router
    router(app);

    // khởi tạo middleware handle lỗi
    app.use(errorHandlingMDW.handleErrorOccurAfterRequest);

    // lên lịch tự động 1 lấy một vài thứ
    const event = new EventEmitter();
    const shedule = new Shedule(event);
    shedule.start();
    // lỗi schedule
    subscriber(event);
}