const sharp = require("sharp");
const path = require('path');


async function flopImage(buf, new_name) {
  try {
    await sharp(buf)
      .png()
      .flip()
      .toFile(new_name)
  } catch (error) {
    console.log(error);
  }
}

module.exports = flopImage