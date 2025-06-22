import File from '../../models/files.js';

const getFiles = async (req, res) => {
    try {
        const fileId = req.query.fileId;
        const offset = req.query.offset ? req.query.offset : 0;
        let files = [];
        if (fileId) {
            files = await File.find({ fileId });
        }
        else {
            files = await File.find().skip(offset).limit(5);
        }
        const totalCount = await File.countDocuments();
        return res.status(200).json({ data: files, totalCount });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default getFiles;