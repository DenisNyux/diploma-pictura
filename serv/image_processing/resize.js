const sharp = require("sharp");
const path = require('path');

async function resizeImage(path_to_image, new_filename, kf) {
  try {
    const img = await sharp(path_to_image);
    img
    .resize({
      width: (await img.metadata()).width / kf,
      height: (await img.metadata()).height / kf
    })
    // .toFormat("jpeg", { mozjpeg: true })
    .toFile(new_filename);
  } catch (error) {
    console.log(error);
  }
}

// resizeImage(path.join(__dirname, '/ba6c9912-f7f0-4d25-9350-743876e671e9.png'), 'sas.png', 5)

module.exports = resizeImage;