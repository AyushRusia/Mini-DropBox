import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Icon,
    Box
} from '@mui/material';
import axios from 'axios';
import FilePreviewModal from './Preview';
const FileList = ({ files }) => {

    const [selectedFile, setSelectedFile] = React.useState({});
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const formatBytes = (bytes) => {
        if (!bytes) return '0 B';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };
    // download
    const downloadFile = async (file) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_KEY}/file/download/${file.fileId}`, {
                responseType: 'blob', //
                withCredentials: true //
            });

            const url = window.URL.createObjectURL(res.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error('Error downloading file:', err);
        }
    }

    //preview

    const handlePreview = (file) => {
        setSelectedFile(file);
        setPreviewOpen(true);
    }
    return (
        <>
            <FilePreviewModal
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                fileName={selectedFile?.fileId}
                fileType={selectedFile?.fileType}
            />
            <List>
                {files.map((file) => (
                    <ListItem
                        key={file.id}
                        divider
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <ListItemText
                            primary={file.fileName}
                            secondary={`${file.fileType} • ${formatBytes(file.fileSize)}`}

                        />
                        <Box>
                            <IconButton
                                color="primary"
                                onClick={() => downloadFile(file)}
                                title="Download"
                            >
                                <Icon>download</Icon>
                            </IconButton>

                            <IconButton
                                color="secondary"
                                onClick={() => handlePreview(file)}
                                title="Preview"
                            >
                                <Icon>visibility</Icon>
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default FileList;
