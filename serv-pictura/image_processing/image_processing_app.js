const fs = require('fs');
const uuidv4 = require('uuid').v4;
const imgFuncs = require('./image_functions')
const isBase = require('is-base64')
const path = require('path')


function verifyBuffer(input){
    if (isBase(input)){
        return 'It is base-buffer' ;
    } 
    else {
        return  new Error('Invalid input image')
    }
}

function getBuffer(input) {
    if (isBase(input)){
        return Buffer.from(input, 'base64');
    }
    else {
        throw new Error('Invalid input image')
    }
}


async function verifyFile(localPath) {
    const fullPath = path.join('/home/denisnyux/serv-pictura/', localPath)
    if (fs.existsSync(fullPath) && Buffer.isBuffer(fs.readFileSync(fullPath))){
        return 'Path is fine'
    }
    else {
        return new Error('Invalid path')
    }
}

function bufFromFile(localPath) {
    const fullPath = path.join('/home/denisnyux/serv-pictura/', localPath)
    if (fs.existsSync(fullPath)){
        return fs.readFileSync(fullPath)
    }
    else {
        throw new Error('Invalid path')
    }
}



async function changeImage(buf, action, params) {
    return await imgFuncs[action](buf, params)
}

async function SaveImage(buf) {
    const localPath = '/static/uploads/' + uuidv4() + '.png';
    const fullPath = path.join('/home/denisnyux/serv-pictura', localPath) 
    fs.writeFileSync(fullPath, buf);
    const meta = await imgFuncs['getMetadata'](buf);
    return {
        "path": localPath,
        "bs64string": buf.toString('base64'),
        "meta": meta
    }
}

async function getImgWithMeta(buf, fileName) {
    const meta = await imgFuncs['getMetadata'](buf);
    return {
        "img_name": fileName,
        "meta": meta,
        "bs64img": buf.toString('base64')
    }
}

function getBs64Img(buf) {
    return buf.toString('base64')
}


module.exports = {
    verifyBuffer,
    getBs64Img,
    getImgWithMeta,
    changeImage,
    SaveImage,
    bufFromFile,
    getBuffer,
    verifyFile,
}