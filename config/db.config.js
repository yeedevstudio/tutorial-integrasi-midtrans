module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_NAME || "yeedev_shop",
    PORT: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
    },
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
