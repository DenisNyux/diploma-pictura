const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const get_meta = require('./image_processing/getmeta');
const { json } = require('body-parser');



const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true, limit: '10mb'}));

// Атомизировать
// async function base_converter(img_base) {
//     const buf = Buffer.from(img_base, 'base64');
//     const meta = await get_meta(buf);
//     const format = meta.format;
//     const img_name = uuidv4();
//     return {
//         "img_name": img_name,
//         "format": format,
//         "meta": meta,
//         "buf": buf,
//         "bs64img": img_base 
//     }
// }

// function json_output(file_name) {
//     const buf = fs.readFileSync(file_name);
//     const meta = await get_meta(buf);
//     const format = meta.format;
//     return {
//         "img_name": file_name,
//         "format": format,
//         "meta": meta,
//         "buf": buf,
//         "bs64img": img_base 
//     }
// }

async function json_res(file_path, file_name) {
    const file_buf = fs.readFileSync(file_path);
    const meta = await get_meta(file_buf);
    return {
        "img_name": file_name,
        "meta": meta,
        "bs64img": file_buf.toString('base64')
    }
}

router.post('/', async (req, res) => {
    console.log(req.body.base64image.substr(0, 100));
    const req_img_buf = Buffer.from(req.body.base64image, 'base64');
    const file_to_write_name = uuidv4() + '.png';
    const file_to_write_path = path.join(__dirname, './static/uploads/') + file_to_write_name;
    console.log(file_to_write_path)
    fs.writeFileSync(file_to_write_path, req_img_buf);
    res.status(200).json(await json_res(file_to_write_path, req.body.image_name))
});

router.post('/rotate', async (req, res) => {
    const rotate = require('./image_processing/rotator');
    console.log(req.body.base64image.substr(0, 10));
    const req_img_buf = Buffer.from(req.body.base64image, 'base64');
    const file_to_write_name = uuidv4() + '-rotated.png';
    const file_to_write_path = path.join(__dirname, './static/uploads/') + file_to_write_name;
    await rotate(req_img_buf, file_to_write_path, Number(req.body.angle));
    console.log('its fine')
    res.status(200).json(await json_res(file_to_write_path, req.body.image_name));
})


// router.post('/rotate', async (req, res) => {
//     const rotate = require('./image_processing/rotator');
//     const req_img_buf = Buffer.from(req.body.base64image, 'base64');
//     const new_name = path.join(__dirname, './static/uploads/') + uuidv4()+ '-rotated' + '.png';
//     await rotate(req_img_buf, 
//         new_name, 
//         Number(req.body.angle)
//         )
//     res.status(200).json(await json_res(new_name))
// });


router.post('/crop', async (req, res) => {
    const crop_img = require('./image_processing/crop');
    const img = await base_converter(req.body.base64image);
    const new_name = path.join(__dirname, './static/uploads/') + img.img_name + '-cropped.' + 'png';
    await crop_img(img.buf,
        new_name,
        Number(req.body.left), 
        Number(req.body.top), 
        Number(req.body.width), 
        Number(req.body.height)
        );
    res.sendFile(new_name);
});




router.post('/flip', async (req, res) => {
    const flip = require('./image_processing/flip');
    const img = await base_converter(req.body.base64image);
    const new_name = path.join(__dirname, './static/uploads/') + img.img_name + '-flipped.' + 'png';
    await flip(img.buf, 
        new_name, 
        )
    res.sendFile(new_name);
});

router.post('/flop', async (req, res) => {
    const flop = require('./image_processing/flop');
    const img = await base_converter(req.body.base64image);
    const new_name = path.join(__dirname, './static/uploads/') + img.img_name + '-flopped.' + 'png';
    await flop(img.buf, 
        new_name, 
        )
    res.sendFile(new_name);
});

router.post('/gblur', async (req, res) => {
    const gblur = require('./image_processing/gblur');
    const img = await base_converter(req.body.base64image);
    const new_name = path.join(__dirname, './static/uploads/') + img.img_name + '-gblurred.' + 'png';
    await gblur(img.buf, 
        new_name, 
        Number(req.body.sigma)
        )
    res.sendFile(new_name);
});

module.exports = router;