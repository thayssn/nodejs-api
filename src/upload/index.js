const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // error first callback
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
    	console.log(`created -> ${Date.now()}${path.extname(file.originalname)}`);
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage }).single('photo');

module.exports = upload;
