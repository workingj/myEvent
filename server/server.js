import express from "express";
import cors from "cors";
import { errorHandler } from "./middelwares/ErrorHandler.js";
import cookieParser from 'cookie-parser';
import contactRouter from './routes/ContactRouter.js';
import userRouter from './routes/UserRouter.js';
import "./db/db.js";
import "./services/mail.js";
import dotenv from "dotenv";
import adminTemplateRouter from "./routes/TemplateRouter.js";
import eventRouter from "./routes/EventRouter.js";
import giftRouter from "./routes/GiftRouter.js";
import { processEvents } from "./Controller/MailController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// CONFIGURE EXPRESS
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// COOKIES
app.use(cookieParser());

// ROUTES
app.use('/test', contactRouter);
app.use('/user', userRouter);
app.use('/user/contacts', contactRouter);
app.use('/user/events', eventRouter);
// app.use('/user/templates', eventRouter);
app.use('/admin/templates', adminTemplateRouter);
// Gifr card Router
app.use('/giftcards', giftRouter);

// ERROR HANDLER
app.use(errorHandler);

// LISTENER
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));

setInterval(processEvents, 1000 * 60 * 1);
