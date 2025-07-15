// smartsho-backend/src/middleware/errorHandler.js
// Centralized error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong on the server.';

    res.status(statusCode).json({
        success: false,
        message: message,
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default errorHandler;
