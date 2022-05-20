const sharp = require("sharp");
const path = require('path');
const get_meta = require('./getmeta')

async function resizeImage(img_buf, new_filename, kf) {
  try {
    await sharp(img_buf)
    .resize({
      width: Math.round((await get_meta(img_buf)).width * kf),
      height: Math.round((await get_meta(img_buf)).height * kf)
    })
    // .toFormat("jpeg", { mozjpeg: true })
    .toFile(new_filename);
  } catch (error) {
    console.log(error);
  }
}

// resizeImage(path.join(__dirname, '/ba6c9912-f7f0-4d25-9350-743876e671e9.png'), 'sas.png', 5)

module.exports = resizeImage;