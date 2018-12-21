require('dotenv').config();
const isProd = process.env.NODE_ENV === "production"

module.exports = {
    serverRuntimeConfig: { // Will only be available on the server side
        secret: process.env.SECRET,
    },
    publicRuntimeConfig: { // Will be available on both server and client
        api: isProd ? process.env.API : process.env.LOCAL_API,
        coreApi: isProd ? process.env.PROD_API : process.env.DEV_API,
    }
}