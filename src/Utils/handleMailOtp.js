const {transporter} = require('./../Lib');
const {GenerateSalt, GeneratePassword, ValidatePassword} = require('./handleData');
const {createMailTemplate} = require('./../Pattern/Factory');

//otp sending
module.exports.sendOtpThroughMail = async(payload, type)=>{
    try {
        const template = createMailTemplate(type);
        const {key, data} = template(payload);

        //send data to mail
        await transporter.sendMail(data);

        //create salt
        const salt = await GenerateSalt();

        //create new key
        const secretKey = await GeneratePassword(key.toString(), salt);

        return secretKey;
    } catch(err){
        throw err;
    }
}

//otp confirm
module.exports.verifyMailOtp = async(key, secretKey)=>{
    try {
        const result = await ValidatePassword(key, secretKey);
        return result;
    } catch(err){
        throw err;
    }
}