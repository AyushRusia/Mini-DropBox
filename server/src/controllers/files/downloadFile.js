import File from '../../models/files.js';
import path from 'path';
const downloadFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const fileData = await File.findOne({ fileId });

        if (!fileData)
            res.status(404).json({ error: 'File Not Found with file ID' });
        return res.status(200).download(path.resolve(fileData.filePath));

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default downloadFile;