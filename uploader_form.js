const express = require('express');
const multer  = require('multer');
const path = require('path');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './static/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const filter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
}


const upload = multer({ 
    storage: storage,
    fileFilter: filter
}).single('uploaded_file');

router.post('/', function (req, res) {
    upload(req, res, function (err){
        if(err) {
            return res.end("<h1>Error uploading file.</h1>");
        }
        console.log(req.body)
        res.sendFile(path.join(__dirname, './static/uploads/' + req.file.filename));
    });
});


module.exports = router;