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


