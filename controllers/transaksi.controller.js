const db = require('../models/index.js');
const Transaksi = db.transaksi;
const { coreApi } = require('../config/apiMidtrans.config.js');

exports.midtransChargeTransaction = async (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            success: false,
            message: "Content can not be empty!",
        });
    }

    try {
        // lakukan charge transaksi ke server midtrans sesuai request 
        coreApi.charge(req.body).then((chargeResponse) => {
            // console.log(chargeResponse);
            Transaksi.create({
                order_id: chargeResponse.order_id,
                nama: req.body.nama,
                transaction_status: chargeResponse.transaction_status,
                response_midtrans: JSON.stringify(chargeResponse),
            }).then(data => {
                return res.status(201).json({ success: true, message: "Berhasil melakukan charge transaction!", data: data });
            }).catch(error => {
                return res.status(400).json({ success: false, message: error.message, });
            });

        }).catch((error) => {
            return res.status(400).json({ success: false, message: error.message, });
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, });
    }
}


exports.midtransGetStatusTransaction = async (req, res) => {

    try {

        let dataMidtransTransaction = await Transaksi.findOne({ // lakukan cek data transaksi pada database
            where: {
                order_id: req.params.order_id,
            },
        });

        if (dataMidtransTransaction) {
            coreApi.transaction.status(dataMidtransTransaction.order_id) // lakukan get transaction status ke server midtrans
                .then((responseGetTransactionStatus) => {
                    console.log(responseGetTransactionStatus);
                    Transaksi.update({
                        response_midtrans: JSON.stringify(responseGetTransactionStatus),
                        transaction_status: responseGetTransactionStatus.transaction_status,
                    }, {
                        where: {
                            order_id: responseGetTransactionStatus.order_id,
                        },
                    }).then(() => {
                        return res.status(200).json({ success: true, message: `Berhasil get status transaction, order_id: ${req.params.order_id}`, data: responseGetTransactionStatus });
                    }).catch(error => {
                        return res.status(400).json({ success: false, message: error.message, });
                    });
                }).catch(error => {
                    return res.status(400).json({ success: false, message: error.message, });
                });
        } else {
            return res.status(404).json({ success: false, message: "order id tidak ditemukan!" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, });
    }
}


exports.midtransNotification = async (req, res) => {

    try {
        coreApi.transaction.notification(req.body) // terima body notifikasi dari server midtrans
            .then((dataNotification) => {
                // console.log(dataNotification);
                Transaksi.update({
                    response_midtrans: JSON.stringify(dataNotification),
                    transaction_status: dataNotification.transaction_status,
                }, {
                    where: {
                        order_id: dataNotification.order_id,
                    }
                }).then(() => {
                    return res.status(200).json({ success: true, message: "Berhasil terima notifikasi!", data: dataNotification });
                }).catch(error => {
                    return res.status(400).json({ success: false, message: error.message, });
                });
            }).catch(error => {
                return res.status(400).json({ success: false, message: error.message, });
            });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, });
    }
}