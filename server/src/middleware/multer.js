import multer from 'multer';
import fs from 'fs';
import path from 'path';
const uploadPath = path.join('localdb');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + '_' + file.originalname)
    }
})
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // limit file to 10 MB
});

export default upload;