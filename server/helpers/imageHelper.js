const multer = require('multer');

const storage = multer.diskStorage({
    destination: '../client/images',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const send = (req, res) => {
    return res.download(`../images/${req.params.path}`)
}

module.exports.upload = upload;
module.exports.send = send;