import express from "express";
import cors from "cors";
import { errorHandler } from "./middelwares/ErrorHandler.js";
// import cookieParser from 'cookie-parser';
// import contactRouter from './routes/contactRouter.js';
import "./db/db.js";
import dotenv from "dotenv";
import adminTemplateRouter from "./routes/TemplateRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// CONFIGURE EXPRESS
app.use(cors());
app.use(express.json());
// COOKIES
// app.use(cookieParser());

// ROUTES
// app.use('/contacts', contactRouter);
app.use("/admin/templates", adminTemplateRouter);

// ERROR HANDLER
app.use(errorHandler);

// LISTENER
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
