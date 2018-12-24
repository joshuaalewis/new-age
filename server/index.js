// packages and setup
require('dotenv').config()
const axios         = require("axios")
const jsonWebToken  = require("jsonwebtoken")
const bodyParser    = require('body-parser')
const express       = require('express')
const cors          = require('cors')
const cookieParser  = require('cookie-parser')
const cookie        = require('cookie')
const uuidv4        = require('uuid/v4')
const Fs            = require('fs')  
const Path          = require('path')  
const http          = require('http')
const Schema        = require('schema-client')

const port       = process.env.PORT
const dev        = process.env.NODE_DEV !== 'production'
const api        = process.env.API
const clientID   = process.env.CLIENT
const key        = process.env.KEY

const store      = [];

const server = express();
const client = new Schema.Client(clientID, key)   

server.use(cors());
server.use(cookieParser())
// const router = express.Router();

server.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");

    if(req.method === 'OPTIONS') {
        res.send(200);
    }

    next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.options('/', cors())

server.post('/api/ping', function(req, res) {
    res.json({message: 'pong'});
})

server.get('/api/:resource', function(req, res) {
    const resource = req.params.resource
    if(!resource) return res.status(400).json()

    axios.get(`${api}/${resource}?active=true`)
    .then(result => {
        return result && result.data ? res.json(result.data) : res.status(500).json({error: "unable to retrieve resource"})
    })
})

server.listen(port, err => {
    if (err) throw err;
    console.log(`Server ready on port ${port}`)
})