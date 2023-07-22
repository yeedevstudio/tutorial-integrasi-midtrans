const midtransClient = require('midtrans-client');

exports.coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-q-GWvFcWOuuqrPKz0dZDfWib',
    clientKey: 'SB-Mid-client-Wf3_SlPORYMkocno'
});