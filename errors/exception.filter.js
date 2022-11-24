const HttpError = require('./http.error');
const logger = require('../services/logger.service');

module.exports = (err, req, res, next) => {

    // Instance control
    if (err instanceof HttpError) {
        logger.error(`Error ${err.statusCode}: ${err.message}`);

        return res
            .status(err.statusCode)
            .json({
                success: false,
                message: err.message
            });
    } else {
        logger.error(err.message);

        return res.
            status(500)
            .json({
                success: false,
                message: err.message
            });
    }

}