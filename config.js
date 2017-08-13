"use strict";

module.exports = {
    PORT: 3000,
    HOST: "localhost:3000",
    TOKEN_EXPIRATION_TIME: 1000 * 60 * 60 * 24,
    PROTOCOL: process.env.PROTOCOL || "http",
    //Should be in env variable
    MONGODB_CONNECTION_STRING: "mongodb://localhost/wtt-paysimple",
    //Should be in env variable
    PAYSIMPLE_PARAMS: {
        accessid: 'APIUser154814',
        key: 'cnQJkR5lKb6oDZmRK2aDUORJbwBlzdXnyim70tysH0dUgWLuyYKFpVLuKDpCSFJbfWXWDHlKAWJOc8t4yebnzNtZGojNMxpn7qrxWg73d4VvKdyUk41lyquREY24kVg0'
    },
    MAILGUN_PARAMS: {
        auth: {
            api_key: 'api',
            domain: 'domain'
        }
    }
};