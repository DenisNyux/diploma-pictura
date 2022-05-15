const sharp = require("sharp");
// const path = require('path');

async function getMetadata(path_to_image) {
  try {
    const metadata = await sharp(path_to_image).metadata();
    return metadata;
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

// getMetadata(path.join(__dirname, '/resized.png'))

module.exports = getMetadata;