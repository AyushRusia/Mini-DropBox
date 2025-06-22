import File from '../../models/files.js';
const UploadFile = async (req, res) => {
    try {
        const { fileName } = req.body;
        const uploadedfile = req.file;
        if (!uploadedfile)
            return res.status(400).json({ error: 'Missing File' });

        const { filename, path, size, mimetype } = uploadedfile;
        const owner = req.username;
        if (!fileName)
            return res.status(400).json({ error: 'Missing Data' });
        const file = await File.create({ fileName, fileId: filename, filePath: path, fileSize: size, fileType: mimetype, owner })
        return res.status(201).json({ data: file, });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default UploadFile;