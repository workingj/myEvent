import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import contactRouter from './routes/ContactsRouter.js'
import { errorHandler } from "./middleware/ErrorHandler.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());
app.use(cookieParser()); 

// ROUTES
app.use('/contacts',contactRouter)

// ERROR HANDLER
app.use(errorHandler);

// LISTENER
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));