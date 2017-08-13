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
        try {
            var r1 = (yield createCustomer(customer));
            var CustomerId = r1.Response.Id;
            if (!CustomerId) throw new Error();
        } catch (e){
            let e = new Error("Can't create customer!");
            e.info = r1;
            throw e;
        }

        let creditCard = {
            CreditCardNumber: req.body.CreditCardNumber,
            ExpirationDate: req.body.ExpirationDate,
            Issuer: req.body.Issuer,
            IsDefault: false,
            CustomerId: CustomerId
        };

        try {
            var r2 = (yield addCreditCard(creditCard));
            var creditCardId = r2.Response.Id;
            if (!creditCardId) throw new Error();
        } catch (e){
            let e = new Error("Can't create credit card!");
            e.info = r2;
            throw e;
        }

        let payment = {
            AccountId: creditCardId,
            Amount: req.user.amountDue,
            CVV: req.body.CVV,
            Description: req.user.program,
            SendToCustomer: true
        };

        try {
            var paymentResponse = (yield createPayment(payment)).Response;
            if (paymentResponse.Status == 3 || paymentResponse.Status == "Failed") {
                throw new Error();
            }
        } catch (e){
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