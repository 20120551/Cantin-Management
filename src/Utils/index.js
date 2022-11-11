const {
    GenerateSalt, 
    GeneratePassword,
    ValidatePassword,
    GenerateToken,
    VerifyToken,
    FormatData,
    ValidateSignature,
    RandomNumber
} = require('./handleData');

const {
    verifyMailOtp,
    sendOtpThroughMail,
} = require('./handleMailOtp');

module.exports = {
    GenerateSalt, 
    GeneratePassword,
    ValidatePassword,
    GenerateToken,
    VerifyToken,
    FormatData,
    verifyMailOtp,
    sendOtpThroughMail,
    ValidateSignature,
    RandomNumber
}