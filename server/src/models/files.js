import mongoose from 'mongoose';
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  metaData: {
    type: String,
  },
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);
export default File;
