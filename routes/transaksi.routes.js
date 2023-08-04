module.exports = (app) => {
    const controller = require("../controllers/transaksi.controller.js");

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });

    // Midtrans Transaction
    app.get('/midtrans-transaction/transaction-status/:order_id', controller.midtransGetStatusTransaction);
    app.post('/midtrans-transaction/charge', controller.midtransChargeTransaction);
    app.post('/midtrans-transaction/notification', controller.midtransNotification);

};

