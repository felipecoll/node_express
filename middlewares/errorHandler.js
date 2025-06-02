const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';

    console.error(`Error: ${errorMessage}, Status Code: ${statusCode}`);
    
    res.status(statusCode).json({
        error: {
            message: errorMessage,
            status: statusCode,
            ...err(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
        }
    });
}

module.exports = errorHandler;