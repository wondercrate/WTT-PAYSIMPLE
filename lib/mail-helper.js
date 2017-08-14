"use strict";

let co = require("co");
let config = require("../config");
let mailer = require("nodemailer");
let promisify = require("es6-promisify");
let nodemailerMailgunTransport = require("nodemailer-mailgun-transport");

let mailgunTransport = mailer.createTransport(nodemailerMailgunTransport(config.MAILGUN_PARAMS));
let sendMailViaMailGun = promisify(mailgunTransport.sendMail.bind(mailgunTransport));

function sendPasswordResetMail(email, token){
    return co(function*(){
        let letter = {
            to: email,
            from: "administration@wondercrate.com",
            text: "You can change your email via this link: " + config.PASSWORD_RESET_LINK + "?email=" + email + "&token=" + token
        };
        yield sendMailViaMailGun(letter);
    });
}

module.exports = {
    sendPasswordResetMail: sendPasswordResetMail
};