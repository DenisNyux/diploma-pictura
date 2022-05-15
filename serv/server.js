const express = require('express');
const multer  = require('multer');
const path = require('path');
const uploader_form = require('./uploader_form');
const uploaded_base = require('./uploader_base64')
const cors = require('cors')
const morgan = require('morgan')

// App initiation
const app = express()
const port = 3030;

// Import form file uploader route
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use('/fileload', uploader_form);
app.use('/api', uploaded_base);


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/static/index.html'));
});


app.listen(port, () => {
    console.log('Server started at http://51.250.4.39:' + port);
});
