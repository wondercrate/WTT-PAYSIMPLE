"use strict";

let co = require("co");
let express = require("express");
let config = require("../config");
let promisify = require("es6-promisify");
let userController = require("./userController");
let paysimple = new (require('paysimple'))(config.PAYSIMPLE_PARAMS);

process.env.ENVIRONMENT !== "prod" && paysimple.setDevmode();

let paymentRouter = express.Router();
paymentRouter.post("/process-transaction", processTransaction);

let createCustomer = promisify(paysimple.customers.create.bind(paysimple));
let createPayment = promisify(paysimple.payments.create.bind(paysimple));
let addCreditCard = promisify(paysimple.paymentAccounts.addCreditCard.bind(paysimple));

function processTransaction(req, res, next){
    return co(function*(){
        let customer = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            BillingAddress: req.body.BillingAddress,
            Email: req.body.Email,
            ShippingSameAsBilling: true
        };

        let CustomerId = (yield createCustomer(customer)).Id;

        if (!CustomerId)
            throw new Error("Can't create customer!");

        let creditCard = {
            CreditCardNumber: req.body.CreditCardNumber,
            ExpirationDate: req.body.ExpirationDate,
            Issuer: req.body.Issuer,
            IsDefault: false,
            CustomerId: CustomerId
        };

        let creditCardId = (yield addCreditCard(creditCard)).Id;

        if (!creditCardId)
            throw new Error("Can't create credit card!");

        let payment = {
            AccountId: creditCardId,
            Amount: req.user.amountDue,
            CVV: req.body.CVV,
            Description: req.user.program,
            SendToCustomer: true
        };

        let paymentResponse = yield createPayment(payment);

        if (paymentResponse.Status == 3 || paymentResponse.Status == "Failed"){
            let e = new Error("Cant process payment.");
            e.info = paymentResponse;
            throw e;
        }

        req.user.amountDue = 0;
        req.user.paysimpleInfo = {
            CustomerId: CustomerId
        };
        yield userController.updateUser(req.user);

        res.send(paymentResponse);
    }).catch(next);
}

module.exports = {
    router: paymentRouter
};