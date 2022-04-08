const fsPromises = require('fs').promises;

const cleanupImages = async () => {
    const dir = './tests/testUploadedImages';

    await fsPromises.rmdir(dir, { recursive: true });
}

module.exports.cleanupImages = cleanupImages;