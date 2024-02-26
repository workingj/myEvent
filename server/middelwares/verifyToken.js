import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
    // const { authorization } = req.headers; // if using token
    const  authorization  = req.cookies.token; // if using cookie
    if (!authorization) throw new ErrorResponse('Please login', 204);
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
});

export default verifyToken;