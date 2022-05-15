const sharp = require("sharp");
const path = require('path');


async function rotateImage(buf, new_name, angle) {
  try {
    await sharp(buf)
      .png({ palette: true })
      .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(new_name);
  } catch (error) {
    console.log(error);
  }
}


// console.log(typeof(cropImage))
// rotateImage(path.join(__dirname, '/er3.jpg'), 'sas', 30)

module.exports = rotateImage