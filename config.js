"use strict";

module.exports = {
    PORT: 3000,
    HOST: "localhost:3000",
    TOKEN_EXPIRATION_TIME: 1000 * 60 * 60 * 24,
    PROTOCOL: process.env.PROTOCOL || "http",
    MONGODB_CONNECTION_STRING: "mongodb://localhost/wtt-paysimple",
    PAYSIMPLE_PARAMS: {
        accessid: 'test',
        key: 'test'
    },
    MAILGUN_PARAMS: {
        auth: {
            api_key: 'api',
            domain: 'domain'
        }
    }
};