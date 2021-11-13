function ch_b(src, dst) {
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
}

function resize(src, dst, width, height) {
    const dsize = new cv.Size(width, height);
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
}

function resize_proportions(src, dst, kf) {
    const {width, height} = src.size()
    const dsize = new cv.Size(Math.round(width*kf), Math.round(height*kf));
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
}

function imageSizeAfterRotation(size, degrees) {
    degrees = degrees % 180;
    if (degrees < 0) {
        degrees = 180 + degrees;
    }
    if (degrees >= 90) {
        size = [ size[1], size[0] ];
        degrees = degrees - 90;
    }
    if (degrees === 0) {
        return size;
    }
    const radians = degrees * Math.PI / 180;
    const width = (size[0] * Math.cos(radians)) + (size[1] * Math.sin(radians));
    const height = (size[0] * Math.sin(radians)) + (size[1] * Math.cos(radians));
    return [ width, height ];
}

function rotate(src, dst, angle) {
    // Нужно создать новое изображение с размером после поворота и поместить туда исходную картинку и только после этого уже поворачивать ее
    const size = imageSizeAfterRotation([src.cols, src.rows], angle) 
    const newImage = new cv.Mat(cv.Size(Math.round(size[0]), Math.round(size[1])))
    src.copyTo(newImage)
    // let dsize = new cv.Size(Math.round(size[0]), Math.round(size[1]));
    // let center = new cv.Point(src.cols / 2, src.rows / 2);
    // let M = cv.getRotationMatrix2D(center, angle, 1);
    // cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    // M.delete();
}