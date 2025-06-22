import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack
} from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};



const UploadModal = ({ open, onClose, refresh }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const validateFile = (selectedFile) => {
    if (!selectedFile) return;
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Only JPG, PNG, PDF, or TXT files are allowed.');
      return false;
    }


    if (selectedFile.size > MAX_SIZE) {
      setError('File size must be under 5 MB.');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    await axios.post(`${import.meta.env.VITE_API_KEY}/file/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    refresh(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !fileName) {
      setError('Please fill both fields.');
      return;
    }
    await handleUpload();
    onClose();
  };
  React.useEffect(() => {
    if (!open) {
      setFile(null);
      setFileName('');
      setError('');
    }
  }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Upload New File</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              fullWidth
            />
            <Button variant="outlined" component="label">
              Choose File
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf,.txt"
                onChange={handleFileChange}
              />
            </Button>
            {file && <Typography variant="body2">{file.name}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="text" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">Upload</Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default UploadModal;
