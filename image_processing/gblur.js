const sharp = require("sharp");
const path = require('path');


async function gBlur(buf, new_name, sg) {
  try {
    await sharp(buf)
      .png()
      .blur(sg)
      .toFile(new_name)
  } catch (error) {
    console.log(error);
  }
}

module.exports = gBlur;
