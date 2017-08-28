"use strict";

let co = require("co");
let express = require("express");
let config = require("../config");
let promisify = require("es6-promisify");
let userController = require("../auth/resetUserController");
let mailHelper = require("../lib/mail-helper");
let paysimple = new (require('paysimple'))(config.PAYSIMPLE_PARAMS);

process.env.ENVIRONMENT !== "prod" && paysimple.setDevmode();

let paymentRouter = express.Router();
paymentRouter.post("/process-transaction", processTransaction);

let createCustomer = promisify(paysimple.customers.create.bind(paysimple));
let createPayment = promisify(paysimple.payments.create.bind(paysimple));
let addCreditCard = promisify(paysimple.paymentAccounts.addCreditCard.bind(paysimple));
let  cardValidator = require('creditcards/card');
function getIssuer(number) {
    var type = cardValidator.type(number);
    if (type === "Visa") return 12;
    if (type === "MasterCard") return 13;
    if (type === "American Express") return 14;
    if (type === "Diners Club") return 15;
}
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
            e = new Error("Can't create customer!");
            e.info = r1;
            throw e;
        }
        let creditCard = {
            CreditCardNumber: req.body.CreditCardNumber,
            ExpirationDate: req.body.ExpirationDate,
            Issuer: getIssuer(req.body.CreditCardNumber),
            IsDefault: false,
            CustomerId: CustomerId
        };

        try {
            var r2 = (yield addCreditCard(creditCard));
            var creditCardId = r2.Response.Id;
            if (!creditCardId) throw new Error();
        } catch (e){
            e = new Error("Can't create credit card!");
            e.info = r2;
            throw e;
        }
        console.log('req.body.amountDue')
        console.log(req.body.amountDue);
        let payment = {
            AccountId: creditCardId,
            Amount: req.body.amountDue,
            CVV: req.body.CVV,
            Description: req.body.program,
            SendToCustomer: true
        };
        console.log(payment);

        try {
            var paymentResponse = (yield createPayment(payment)).Response;
            if (paymentResponse.Status == 3 || paymentResponse.Status == "Failed") {
                throw new Error();
            }
        } catch (e){
            e = new Error("Cant process payment.");
            e.info = paymentResponse;
            throw e;
        }

        // req.user.amountDue = 0;
        // req.user.paysimpleInfo = {
        //     CustomerId: CustomerId
        // };
        // yield userController.updateUser(req.user);

        console.log("Finished transaction mailing is disabled.");
        //yield mailHelper.sendFinishedTransactionMail(req.user.email, paymentResponse);

        res.send(paymentResponse);
    }).catch(next);
}

module.exports = {
    router: paymentRouter
};