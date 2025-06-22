import express from 'express';
import getFiles from '../controllers/files/getFiles.js';
import UploadFile from '../controllers/files/uploadFile.js';
import upload from '../middleware/multer.js';
import viewFile from '../controllers/files/viewFile.js';
import downloadFile from '../controllers/files/downloadFile.js';
import deleteFile from '../controllers/files/deleteFile.js';
const router = express.Router();
router.post('/upload', upload.single('file'), UploadFile);
router.get('/download/:fileId', downloadFile);
router.get('/', getFiles);
router.get('/:fileId', viewFile);
router.delete('/:fileId', deleteFile);

export default router;