const multer = require('multer');
const path = require('path');

function createImageMulter(props) {
    try {
        let { allowedMimeTypes } = props;
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function(req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        });

        return multer({
            storage: storage,
            fileFilter: (req, file, callback) => {
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload`);
                    return callback(err, false);
                }
                callback(null, true);
            }
        });
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    imageMulter: createImageMulter({
        allowedMimeTypes: ['image/png', 'image/jpeg'],
    }),
};