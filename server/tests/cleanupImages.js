const fs = require('fs');

const cleanupImages = async () => {
    const dir = './tests/testUploadedImages/';

    fs.readdir(dir, (err, files) => {
        if(err) {
            console.log('Cleamup Images readdir Error:', err);
        }

        files.forEach((file) => {
            fs.unlink(`${dir}${file}`, (err) => {
                if (err) {
                    console.log('Cleanup Images Unlink Error:', err);
                }
            });
        });
    });
}

module.exports.cleanupImages = cleanupImages;