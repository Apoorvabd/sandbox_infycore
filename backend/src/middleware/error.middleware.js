import ApiError from "../utils/ApiError.js";

const notFoundHandler = (req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        statusCode,
        data: null,
        message,
        success: false,
        errors: err.errors || []
    });
};

export { notFoundHandler, errorHandler };
