# Secure File Upload Dashboard

A full-stack web application that allows users to upload, preview, and download files securely.

> Built with React, Material UI, Node.js, Express, and MongoDB.  
> Files are stored locally on the server using streaming APIs for efficient handling of large files.

---

##  Features

-  User Authentication (Login & Signup with protected routes)
-  File Upload with Validation
- Allowed types: JPG, PNG, PDF, TXT
- Max size: 5 MB
-  File Preview (Images, PDFs, and text files)
-  File Download via Streaming
-  Interactive File List
  - Pagination
  - Search
  - Action icons: Preview / Download
-  Backend Streaming Support 
-  Clean UI with **Material UI
- Files are stored in a local `localdb/` folder

---

##  Tech Stack

### Frontend:
- React
- Matreial UI
- Axios
- React Router

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- File storage: local filesystem (`fs`)
- JWT-based authentication with HttpOnly cookies
- CORS with credentials
- Multer to stream upload file

---

---

## Steps to Start Application

```bash
git clone https://github.com/AyushRusia/Mini-DropBox/secure-file-dashboard.git
cd Mini-DropBox


### 2. Clone the Repo
cd backend
npm install

create env in backend
PORT=8080
MONGO_URI=mongodb://localhost:27017/mini-dropbox
JWT_SECRET=your_jwt_secret

cd frontend
npm install

create env in frontend
VITE_API_KEY=http://localhost:8080

run individual client and serv with command
bash
npm run start

