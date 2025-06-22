import { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    overflow: 'auto'
};

const FilePreviewModal = ({ open, onClose, fileName, fileType }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const fetchPreview = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_KEY}/file/${fileName}`, {
                responseType: 'blob',
                withCredentials: true,
            });
            const url = URL.createObjectURL(res.data);
            setPreviewUrl(url);
        } catch (error) {
            console.error('Preview fetch error:', error);
        }
    };
    useEffect(() => {
        if (open && fileName) {
            fetchPreview();
        }

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }
        };
    }, [open, fileName]);

    const renderPreview = () => {
        if (!previewUrl) return null;

        if (fileType.startsWith('image/')) {
            return <img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />;
        }

        if (fileType === 'application/pdf') {
            return <iframe src={previewUrl} width="100%" height="100%" title="PDF Preview" />;
        }

        return <Typography>Preview not supported for this file type.</Typography>;
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Preview: {fileName}</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Box>
                <Box mt={2} height="90%">
                    {renderPreview()}
                </Box>
            </Box>
        </Modal>
    );
};

export default FilePreviewModal;
