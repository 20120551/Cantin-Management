const {email} = require('./../../Template');

module.exports.createMailTemplate = function(type) {
    switch(type) {
        case 'ACTIVE': 
            return email.activateMail;
        case 'CHANGE_PASS_WORD': 
            return email.changePassMail;
    }
}