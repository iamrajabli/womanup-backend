const jwt = require('jsonwebtoken')

const HttpError = require('../errors/http.error');

module.exports = (req, res, next) => {
    try {

        const accessToken = req.headers['x-access-token'].split(' ')[1];

        if (!accessToken) {
            throw new HttpError(401, 'Вы должны войти в систему, чтобы просмотреть этот контент.');
        }

        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

            req.user = userData;
        } catch (error) {
            throw new HttpError(404, 'Не валидный токен.');
        }

        next();

    } catch (e) {
        throw new HttpError(401, 'Вы должны войти в систему, чтобы просмотреть этот контент.');
    }

}