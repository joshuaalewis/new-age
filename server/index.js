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

const port       = process.env.SERVER_PORT
const secret     = process.env.SECRET
const dev        = process.env.NODE_DEV !== 'production'
const api        = dev ? process.env.PROD_API : process.env.PROD_API // both prod for now
const core_api   = process.env.CORE_API
const core_usr   = process.env.CORE_USR
const core_pass  = process.env.CORE_PASS

const store      = [];

const server = express();   
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

server.get('/api/specimen', function(req, res) {
    const id = req.query && req.query.id
    axios.defaults.responseType = "application/json";

    if(!id) return res.status(400).json()

    axios.post(`${core_api}/report`, {
        specimenID: id,
        userName: core_usr,
        password: core_pass
    })
    .then(response => {
        return response && response.data ? res.json(response.data) : res.status(500).json()
    })
})

server.post('/api/report/edit/:specimenID', function(req, res) {
    const body = req.body;
    const specimenID = req.params.specimenID;
    const drugs = body.Drugs;
    axios.defaults.responseType = "application/json";

    if(!specimenID) return res.status(400).json()

    let drugList = []
    drugs.forEach(d => {
        drugList.push(d.medispanID)
    });

    axios.post(`${core_api}/report`, {
        specimenID: specimenID,
        type: "medispanID",
        drugList: drugList,
        userName: core_usr,
        password: core_pass
    })
    .then(response => {
        return response && response.data ? res.json(response.data) : res.status(500).json()
    })
})

server.get('/api/drugs', function(req, res) {
    const name = req.query && req.query.name
    axios.defaults.responseType = "application/json";

    if(!name) return res.status(400).json()

    axios.post(`${core_api}/drugLookup`, {
        input: name,
        userName: core_usr,
        password: core_pass
    })
    .then(response => {
        return response && response.data ? res.json(response.data) : res.status(500).json()
    })
})

server.get('/api/report/download/:specimenID', function(req, res) {
    const specimenID = req.params.specimenID;
    // let pdfData = [];
    if(!specimenID) return res.json({error: "No Specimen ID found in request"});
    // res.setHeader('Content-disposition', `attachment; filename=${specimenID}`);

    http.get(`${api}/reports/${specimenID}`, function(response) {
        var chunks = [];

        response.on('data', function(chunk) {
            chunks.push(chunk);
        });

        response.on('end', function() {
            let jsFile = new Buffer.concat(chunks);
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('content-type', 'application/pdf');
            res.header('content-disposition', `attachment; filename=${specimenID}.pdf`);
            res.send(jsFile);
        });

    }).on('error', function() {
        res.status(404).end();
    })
})

server.get('/api/report/view/:specimenID', function(req, res) {
    const specimenID = req.params.specimenID;
    // let pdfData = [];
    if(!specimenID) return res.json({error: "No Specimen ID found in request"});
    // res.setHeader('Content-disposition', `attachment; filename=${specimenID}`);

    http.get(`${api}/reports/${specimenID}`, function(response) {
        var chunks = [];

        response.on('data', function(chunk) {
            chunks.push(chunk);
        });

        response.on('end', function() {
            let jsFile = new Buffer.concat(chunks);
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('content-type', 'application/pdf');
            res.send(jsFile);
        });

    }).on('error', function() {
        res.status(404).end();
    })
})

server.get('/api/specimen/:id', function(req, res) {
    const specimenID = req.params.id;
    if(!specimenID) return res.json({error: "No Specimen ID found in request"});
    axios.get(`${api}/sources/${specimenID}`)
    .then(response => {
        if(response && response.data && response.data.getNewCSharpReportData)
            return res.json(JSON.parse(JSON.stringify(response.data.getNewCSharpReportData)));
        else 
            return res.status(500).json({error: "unknown"})
    })
    .catch(error => {
        return res.json(error);
    })
});

server.get('/api/data/:token', function(req, res) {
    const token = req.params.token;
    if(!token) return res.status(401).json({error: "No token found in request"});

    const session = store.filter(c => c.token === token)[0];
    if(!session) return res.status(401).json({error: "No active session found"});

    axios.get(`${api}/sources/${session.specimenID}`)
    .then(response => {
        if(response && response.data && response.data.getNewCSharpReportData)
            return res.json(JSON.parse(JSON.stringify(response.data.getNewCSharpReportData)));
        else 
            return res.status(500).json({error: "unknown"})
    })
    .catch(error => {
        return res.status(500).json(error);
    })
});

server.post('/api/lookup/standard', function(req, res) {
    const body = req.body;
    const specimenID = body.specimenID;
    const patientID = body.patientID;
    const dob = body.patientDOB;
    console.log(dob);
    let token = {};

    if(!specimenID) {
        return res.status(401).json({error: "No Specimen ID found in request"});
    }
    if(!patientID) {
        return res.status(401).json({error: "No Patient ID found in request"});
    }
    if(!dob) {
        return res.status(401).json({error: "No Date of Birth found in request"});
    }

    axios.get(`${api}/sources/${specimenID}`)
    .then(response => {
        const specimenResponse = JSON.parse(JSON.stringify(response.data));
        console.log(specimenResponse);

        if(!specimenResponse || !specimenResponse.getNewCSharpReportData) {
            return res.status(404).json({error: "Unable to find specimen"});
        }
        if(patientID !== specimenResponse.getNewCSharpReportData.ReportMetaInformation.PatientData.patientID) {
            return res.status(401).json({error: "Patient ID does not match record"});
        }
        if(dob !== specimenResponse.getNewCSharpReportData.ReportMetaInformation.PatientData.patientDOB) {
            return res.status(401).json({error: "Patient DOB does not match record"});
        }

        try {
            let d = new Date(); 
            d.setMinutes(d.getMinutes() + 120);
            const seconds = d.getSeconds();

            const claims = {
                specimenID: specimenID,
                patientID: patientID,
                exp: seconds,
            }

            token = jsonWebToken.sign(claims, secret);
        } catch(error) {
            console.log(error);
            return res.status(500).json({error: error});
        }

        const uuid = uuidv4();
        store.push({key: uuid, token: token, specimenID: specimenID, patientID: patientID});

        return res.json({
            key: uuid,
            token: token,
        });
    })
    .catch(error => {
        return res.status(500).json(error);
    })  
});

server.post('/api/lookup/provider', function(req, res) {
    const body = req.body;
    const specimenID = body.specimenID;
    const patientLastName = body.patientLastName;
    const patientDOB = body.patientDOB;
    const providerNumber = body.providerNumber;
    let token = {};

    if(!specimenID) return res.status(401).json({error: "No Specimen ID found in request"});
    if(!patientLastName) return res.status(401).json({error: "No Patient last name found in request"});
    if(!patientDOB) return res.status(401).json({error: "No Patient DOB found in request"});
    if(!providerNumber) return res.status(401).json({error: "No Provider Number found in request"});

    axios.get(`${api}/sources/${specimenID}`)
    .then(response => {
        const specimenResponse = JSON.parse(JSON.stringify(response.data));

        if(!specimenResponse || !specimenResponse.getNewCSharpReportData) {
            return res.status(404).json({error: "Unable to find specimen"});
        }
        if(patientDOB !== specimenResponse.getNewCSharpReportData.ReportMetaInformation.PatientData.patientDOB) {
            return res.status(401).json({error: "Patient DOB does not match record"});
        }

        const split = specimenResponse.getNewCSharpReportData.ReportMetaInformation.PatientData.patientName.split(" ");
        const lastName = split[split.length - 1];

        if(!lastName || patientLastName !== lastName) {
            return res.status(401).json({error: "Patient last name does not match record"});
        }

        try {
            let d = new Date(); 
            d.setMinutes(d.getMinutes() + 120);
            const seconds = d.getSeconds();

            const claims = {
                specimenID: specimenID,
                patientLastName: patientLastName,
                providerNumber: providerNumber,
                exp: seconds,
            }

            token = jsonWebToken.sign(claims, secret);
        } catch(error) {
            console.log(error);
            return res.status(500).json({error: error});
        }

        return res.json({token: token});
    })
    .catch(error => {
        return res.status(500).json(error);
    })    
});

// server.use('/api', router);
// routes

server.listen(port, err => {
    if (err) throw err;
    console.log(`Server ready on port ${port}`)
})