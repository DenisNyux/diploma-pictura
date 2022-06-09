const sharp = require("sharp");
const path = require('path');


async function getMetadata(buf) {
    try {
      const metadata = await sharp(buf).metadata();
      return metadata;
    } catch (error) {
      console.log(`An error occurred during processing: ${error}`);
    }
}


async function rotateImage(buf, params) {
    try {
      return await sharp(buf)
        .png({ palette: true })
        .rotate(params[0], { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer()
        .then(data => data)
        .catch(er => er)
    } catch (error) {
      return error;
    }
  }
  

async function resizeImage(buf, params) {
    try {
      return await sharp(buf)
      .resize({
        width: Math.round((await getMetadata(buf)).width * params[0]),
        height: Math.round((await getMetadata(buf)).height * params[0])
      })
      // .toFormat("jpeg", { mozjpeg: true })
      .toBuffer()
      .then(data => data)
    } catch (error) {
      console.log(error);
    }
}
  


async function cropImage(buf, params) {
  try {
    return await sharp(buf)
    // Сумма width и left не должна превышать оригинальную ширину картинки. Сумма left и top - высоту
      // .extract({ width: 1320, height: 1080, left: 600, top: 0 })
      .png({ palette: true })
      .extract({ left: params[0], top: params[1], width: params[2], height: params[3] })
      .toBuffer()
      .then(data => data)
  } catch (error) {
    console.log(error);
  }
}


async function flipImage(buf) {
  try {
    return await sharp(buf)
      .png()
      .flip()
      .toBuffer()
      .then(data => data)
  } catch (error) {
    console.log(error);
  }
}

async function flopImage(buf) {
    try {
      return await sharp(buf)
        .png()
        .flop()
        .toBuffer()
        .then(data => data)
    } catch (error) {
      console.log(error);
    }
}

async function gBlur(buf, params) {
    try {
      return await sharp(buf)
        .png()
        .blur(params[0])
        .toBuffer()
        .then(data => data)
    } catch (error) {
      console.log(error);
    }
}

async function greyscale(buf) {
    try {
      return await sharp(buf)
        .png()
        .greyscale()
        .toBuffer()
        .then(data => data)
    } catch (error) {
      console.log(error);
    }
}

async function negate(buf) {
  try {
    return await sharp(buf)
      .png()
      .negate({ alpha: false })
      .toBuffer()
      .then(data => data)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    getMetadata, greyscale, cropImage, resizeImage, gBlur, flopImage, flipImage, rotateImage, negate
}