"use strict";

let co = require("co");
let uuid = require("uuid");
let express = require("express");
let config = require("../config");
let User = require('../models/user');
let mailHelper = require("../lib/mail-helper");
let userRouter = express.Router();

userRouter.post("/reset-password-request", resetPasswordRequest);
userRouter.post("/reset-password", resetPassword);

function updateUser(user){
    return new Promise((resolve, reject)=>{
        User.findOneAndUpdate({_id: user._id}, user, {upsert: true}, e=> e ? reject(e) : resolve());
    });
}

function updateUserByEmail(email, user){
    return new Promise((resolve, reject)=>{
        User.findOneAndUpdate({email: email}, user, {upsert: true}, e=> e ?  reject(e) : resolve());
    });
}

function getUserByEmail(email){
    return new Promise((resolve, reject)=>{
        User.findOne({email: email}, (e, b)=> e ?  reject(e) : resolve(b));
    });
}

function resetPasswordRequest(req, res, next){
    return co(function*(){
        let user = yield getUserByEmail(req.body.email);
        if (!user) return res.sendStatus(404);
        let token = uuid.v1();

        user.info = {
            passwordResetToken: token,
            tokenExpireAt: Date.now() + config.TOKEN_EXPIRATION_TIME
        };

        user.save();

        console.log("Password reset mailing is disabled.");
        //yield mailHelper.sendPasswordResetMail(req.body.email, token);

        res.sendStatus(200);
    }).catch(next);
}

function resetPassword(req, res, next){
    return co(function*(){
        let user = yield getUserByEmail(req.body.email);
        if (!user) return res.sendStatus(404);
        
        if (user.info && user.info.passwordResetToken  == req.body.token && user.info.tokenExpireAt > Date.now()){
            delete user.info.passwordResetToken;
            delete user.info.tokenExpireAt;
            user.password = req.body.newpw;
            user.save();
            return res.sendStatus(200);
        }
        res.sendStatus(404);
    }).catch(next);
}

module.exports = {
    router: userRouter,
    updateUser: updateUser,
    resetPassword: resetPassword,
    resetPasswordRequest: resetPasswordRequest
};