export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = eeror.message || 'Error from ErrorHandler in middleware !!!';
    res.status(statusCode).json({ message: message });
};