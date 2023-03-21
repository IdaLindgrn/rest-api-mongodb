exports.errorMiddleware = (error, req, res, next) => {

    const customError = {
        statusCode: error.statusCode || 500,
        message: error.message,
    }

    if(error.name === "CastError") {
        customError.statuscode = 404
        customError.message = `A resource with id ${error.value} could not be found`;

    }

    return res.status(customError.statusCode).json(customError);
};