import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Icon,
  Container,
  Paper,
  TextField
} from '@mui/material';
import UploadModal from '../components/UploadModal';
import FileList from '../components/FileList';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const Dashboard = () => {
  const navigate = useNavigate();

  // app bar
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_KEY}/auth/logout`);
    sessionStorage.clear();
    logout();
    navigate('/');
  }

  // add button
  const [uploadOpen, setUploadOpen] = useState(false);

  // files
  const [allFiles, setAllFiles] = useState([]);
  const [fileId, setFileId] = useState(null);
  const fetchFiles = async (page) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_KEY}/file`, {
        params: {
          offset: (page) * rowsPerPage, //pagination
          fileId: fileId // filter
        }
      });
      setAllFiles(res.data.data);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };
  // pagination
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchFiles(newPage);
  }

  useEffect(() => {
    fetchFiles(0);
  }, []);

  return (
    <>
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        refresh={fetchFiles}

      />
      <Box>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">Mini Dropbox</Typography>
            <Box display="flex" gap={2} alignItems="center">
              <Typography>Welcome, {user}</Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* File List + Pagination */}
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              startIcon={<Icon>add</Icon>}
              onClick={() => setUploadOpen(true)}
            >
              Upload File
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom>
            All Files
          </Typography>
          <TextField
            label="Search files by File Id"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            onBlur={() => { fetchFiles(0) }}
          />
          <Paper elevation={2}>
            <FileList files={allFiles} />
            <Pagination
              count={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
