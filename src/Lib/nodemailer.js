const nodemailer = require("nodemailer");
const {MAIL_DOMAIN, MAIL_PASSWORD} = require('./../config');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: MAIL_DOMAIN, // generated ethereal user
        pass: MAIL_PASSWORD, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;
