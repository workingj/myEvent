import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import contactRouter from './routes/ContactsRouter.js'
import { errorHandler } from "./middleware/ErrorHandler.js";
import './db/db.js';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 8000;

// CONFIGURE EXPRESS
app.use(cors());
app.use(express.json());

// COOKIES
app.use(cookieParser()); 

// ROUTES
// app.use('/contacts', contactRouter);

// ERROR HANDLER
app.use(errorHandler);

// LISTENER
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));