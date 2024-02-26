import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import contactRouter from './routes/contactRouter.js';
import './db/db.js';
import dotenv from 'dotenv';
dotenv.config();






const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());
// app.use(cookieParser()); 

// ROUTES
// app.use('/contacts', contactRouter);

// Error Handler


app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));