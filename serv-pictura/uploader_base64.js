const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const imageProcessor = require('./image_processing/image_processing_app')
const fs = require('fs');


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


// Запрос для получения метаданных и загрузки/удаления изображения
router.get('/', async (req, res) => {
    if (req.query.path) {
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const responseResult = await imageProcessor.getImgWithMeta(img, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
    } else {
        res.status(400).send('400, Bad request, No key parameters')
    }
});

router.post('/', async (req, res) => {
    if (req.body.base64image){
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const responseResult =  await imageProcessor.SaveImage(img)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request' + er)
        }
    }
    else {
        res.status(400).send('400, Bad request, No key parameters')
    }
});

// console.log(path.join(__dirname, req.query.path))

router.delete('/*', (req, res) =>{
    try {
        fs.unlinkSync(path.join(__dirname, req.query.path))
        res.status(200).send('Deleted successfully')
    }
    catch(er) {
        res.status(400).send('400, Bad request Invalid path' )
    }
})

// Запросы поворота изображения 
router.get('/rotate', async (req, res) => {
    if (req.query.path 
        && req.query.angle 
        && !isNaN(Number(req.query.angle))
        ) {
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(
                img, 
                'rotateImage', 
                [Number(req.query.angle)]
                );
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
        
    } else {
        res.status(400).send('400, Bad request')
    }
});

router.post('/rotate', async (req, res) => {
    if (req.body.base64image 
        && req.body.angle 
        && !isNaN(Number(req.body.angle))) {
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 
                'rotateImage', 
                [Number(req.body.angle)]
                );
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});


// Запросы изменения разрешения
router.get('/resize', async (req, res) => {
    
    if (req.query.path && req.query.kf && !isNaN(Number(req.query.kf))) {
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(img, 'resizeImage', [Number(req.query.kf)])
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
            // console.log(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
        
    } else {
        res.status(400).send('400, Bad request')
    }
});

router.post('/resize', async (req, res) => {
    if (req.body.base64image && req.body.kf && !isNaN(Number(req.body.kf))) {
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 'resizeImage', [Number(req.body.kf)])
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});

// Запросы flip
router.get('/flip', async (req, res) => {
    
    if (req.query.path) {
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(img, 'flipImage')
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
        
    } else {
        res.status(400).send('400, Bad request')
    }
});

router.post('/flip', async (req, res) => {
    if (req.body.base64image) {
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 'flipImage')
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});


// Запросы flop
router.get('/flop', async (req, res) => {
    if (req.query.path) {
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(img, 'flopImage')
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
        
    } else {
        res.status(400).send('400, Bad request')
    }
});

router.post('/flop', async (req, res) => {
    if (req.body.base64image) {
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 'flopImage')
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});

// Запросы gblur
router.get('/gblur', async (req, res) => {
    if (req.query.path && req.query.sigma && !isNaN(Number(req.query.sigma))) {
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(img, 'gBlur', [Number(req.query.sigma)])
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
        
    } else {
        res.status(400).send('400, Bad request')
    }
});

router.post('/gblur', async (req, res) => {
    if (req.body.base64image && req.body.sigma && !isNaN(Number(req.body.sigma))) {
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 'gBlur', [Number(req.body.sigma)])
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});

//Запросы crop
router.get('/crop', async (req, res) => {  
    const params = [
        Number(req.query.left), 
        Number(req.query.top), 
        Number(req.query.width), 
        Number(req.query.height)
    ]
    if (req.query.path && params.every(x => !isNaN(x))){
        try {
            console.log(req.query.path)
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(img, 'cropImage', params)
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
    }
    else {
        res.send(200)
    }
    
});

router.post('/crop', async (req, res) => {
    const params = [
        Number(req.body.left), 
        Number(req.body.top), 
        Number(req.body.width), 
        Number(req.body.height)
    ]
    if (req.body.base64image && params.every(x => !isNaN(x))){
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 'cropImage', params)
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});


// Фильтры
router.get('/filter/greyscale', async (req, res) => {  
    if (req.query.path){
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(img, 'greyscale')
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
    }
    else {
        res.send(200)
    }
    
});

router.post('/filter/greyscale', async (req, res) => {
    if (req.body.base64image){
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 'greyscale')
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});


router.get('/filter/negate', async (req, res) => {  
    if (req.query.path){
        try {
            const img = imageProcessor.bufFromFile(req.query.path)
            const newImg = await imageProcessor.changeImage(img, 'negate')
            const responseResult = await imageProcessor.getImgWithMeta(newImg, req.query.image_name)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(400).send('400, Bad request '+ er)
        }
    }
    else {
        res.send(200)
    }
    
});

router.post('/filter/negate', async (req, res) => {
    if (req.body.base64image){
        try {
            const img = imageProcessor.getBuffer(req.body.base64image)
            const newImg = await imageProcessor.changeImage(img, 'negate')
            const responseResult = await imageProcessor.SaveImage(newImg)
            res.status(200).json(responseResult)
        }
        catch(er) {
            res.status(406).send('400, Bad request'+er)
        }
    } else {
        res.status(400).send('400, Bad request')
    }
});





// if (req.query.base64image) {
    //     try {
    //         const img = imageProcessor.getBuffer(req.query.base64image)
    //         const responseResult = await imageProcessor.getImgWithMeta(img, req.query.image_name)
    //         res.status(200).json(responseResult)
    //     }
    //     catch(er) {
    //         res.status(400).send('400, Bad request '+ er)
    //     }
    // } else 


// router.post('/crop', async(req, res) => {
//     const crop_img = require('./image_processing/crop');
//     const img = await base_converter(req.body.base64image);
//     const new_name = path.join(__dirname, './static/uploads/') + img.img_name + '-cropped.' + 'png';
//     await crop_img(img.buf,
//         new_name,
//         Number(req.body.left),
//         Number(req.body.top),
//         Number(req.body.width),
//         Number(req.body.height)
//     );
//     res.sendFile(new_name);
// });


// if (req.body.base64image && req.body.kf && !isNaN(Number(req.body.kf))) {
    //     try {
    //         const img = imageProcessor.getBuffer(req.body.base64image)
    //         const newImg = await imageProcessor.changeImage(img, 'resizeImage', [Number(req.body.kf)])
    //         const responseResult = await imageProcessor.getImgWithMeta(newImg, req.body.image_name)
    //         res.status(200).json(responseResult)
    //         }
    //     catch(er) {
    //         res.status(400).send('400, Bad request '+ er)
    //     }
    // } else 

// if (req.body.base64image) {
    //     try {
    //         const img = imageProcessor.getBuffer(req.body.base64image)
    //         const newImg = await imageProcessor.changeImage(img, 'flipImage')
    //         const responseResult = await imageProcessor.getImgWithMeta(newImg, req.body.image_name)
    //         res.status(200).json(responseResult)
    //         }
    //     catch(er) {
    //         res.status(400).send('400, Bad request '+ er)
    //     }
    // } else 

// if (req.body.base64image) {
    //     try {
    //         const img = imageProcessor.getBuffer(req.body.base64image)
    //         const newImg = await imageProcessor.changeImage(img, 'flopImage')
    //         const responseResult = await imageProcessor.getImgWithMeta(newImg, req.body.image_name)
    //         res.status(200).json(responseResult)
    //         }
    //     catch(er) {
    //         res.status(400).send('400, Bad request '+ er)
    //     }
    // } else 
    
// if (req.body.base64image && req.body.sigma && !isNaN(Number(req.body.sigma))) {
    //     try {
    //         const img = imageProcessor.getBuffer(req.body.base64image)
    //         const newImg = await imageProcessor.changeImage(img, 'gBlur', [Number(req.body.sigma)])
    //         const responseResult = await imageProcessor.getImgWithMeta(newImg, req.body.image_name)
    //         res.status(200).json(responseResult)
    //         }
    //     catch(er) {
    //         res.status(400).send('400, Bad request '+ er)
    //     }
    // } else 








// if (req.body.base64image && req.body.angle && !isNaN(Number(req.body.angle))) {
    //     try {
    //         const img = imageProcessor.getBuffer(req.body.base64image)
    //         const newImg = await imageProcessor.changeImage(img, 'rotateImage', [Number(req.body.angle)])
    //         const responseResult = await imageProcessor.getImgWithMeta(newImg, req.body.image_name)
    //         res.status(200).json(responseResult)
    //         }
    //     catch(er) {
    //         res.status(400).send('400, Bad request '+ er)
    //     }
    // } else 

module.exports = router;