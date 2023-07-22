module.exports = (sequelize, Sequelize) => {
    const Transaksi = sequelize.define('tb_transaksi', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: Sequelize.STRING,
        },
        nama: {
            type: Sequelize.STRING,
        },
        response_midtrans: {
            type: Sequelize.TEXT('long'),
        },
        transaction_status: {
            type: Sequelize.STRING,
        },
    },
        {
            freezeTableName: true,
            timestamps: false,
        });

    return Transaksi;
}