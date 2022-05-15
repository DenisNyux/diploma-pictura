const sharp = require("sharp");
const path = require('path');


async function flopImage(buf, new_name) {
  try {
    await sharp(buf)
      .png()
      .flop()
      .toFile(new_name)
  } catch (error) {
    console.log(error);
  }
}

module.exports = flopImage