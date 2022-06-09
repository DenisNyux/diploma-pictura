const express = require('express');
const path = require('path');
const uploaded_base = require('./uploader_base64')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const http = require('http');
const https = require('https');

// App initiation
const app = express()
const port = 8080;

// Import form file uploader route
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use('/api', uploaded_base);
app.use('/', express.static('./build'))

const privateKey = fs.readFileSync('/etc/letsencrypt/live/palitra-redactor.ru/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/palitra-redactor.ru/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/palitra-redactor.ru/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


app.get('/.well-known/acme-challenge/x3JTemVLh_kLGuZRpUggRGHawlxQ1YYfZ1hBpj5H34w', (req, res)=>{
    res.sendFile(path.join(__dirname, '.well-known/acme-challenge/33zQeIsPELY5zvEuTXa8q2X4uug75P0R-TCrEH53g5Q'))
})


app.listen(port, () => {
    console.log('Server started at http://palitra-redactor.ru:'+port);
});

// https.createServer(app).listen(80);
// https.createServer(credentials, app).listen(8443);