import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());
app.use(cookieParser()); 

// ROUTES

// Error Handler


app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));