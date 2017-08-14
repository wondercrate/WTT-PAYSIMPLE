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
            text: "You can change your email via this link: " + config.PROTOCOL + ":/" + config.HOST + "/reset-password?email=" + email + "&token=" + token
        };
        console.log(letter);
        yield sendMailViaMailGun(letter);
    });
}

module.exports = {
    sendPasswordResetMail: sendPasswordResetMail
};