import File from '../../models/files.js';
import fs from 'fs';
import path from 'path';
const deleteFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const fileData = await File.findOne({ fileId });

        if (!fileData)
            res.status(404).json({ error: 'File Not Found with file ID' });

        if (req.username !== fileData.owner) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        fs.unlinkSync(path.resolve(fileData.filePath));
        await File.deleteOne({ fileId });
        return res.status(200).json({ data: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default deleteFile;