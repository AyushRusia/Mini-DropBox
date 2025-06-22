import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from "mongoose";
import AuthRouter from './routes/auth.js';
import FileRouter from './routes/file.js'
import authMiidleWare from './middleware/auth.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = new express();

// required middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// test connection
app.get('/', (req, res) => {
  res.send('Hello');
})

// routes
app.use('/auth', AuthRouter);
app.use('/file', authMiidleWare, FileRouter)

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected");
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Listining to port " + PORT);
  });
};

startServer();
