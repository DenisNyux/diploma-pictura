const sharp = require("sharp");
const path = require('path');


async function cropImage(buf, new_name, lt, tp, wh, hg) {
  try {
    await sharp(buf)
    // Сумма width и left не должна превышать оригинальную ширину картинки. Сумма left и top - высоту
      // .extract({ width: 1320, height: 1080, left: 600, top: 0 })
      .png({ palette: true })
      .extract({ left: lt, top: tp, width: wh, height: hg })
      .toFile(new_name)
  } catch (error) {
    console.log(error);
  }
}

module.exports = cropImage;
