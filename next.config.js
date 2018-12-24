require('dotenv').config();
const isProd = process.env.NODE_ENV === "production"

module.exports = {
    serverRuntimeConfig: { // Will only be available on the server side
        api: process.env.LOCAL_API,
    },
    publicRuntimeConfig: { // Will be available on both server and client
        api: process.env.LOCAL_API,
    }
}