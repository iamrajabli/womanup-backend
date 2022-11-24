const jwt = require('jsonwebtoken');

module.exports = class ResponseService {
    static createResponseAndCookie(res, userData) {

        // Создание access токена
        const { JWT_ACCESS_SECRET } = process.env;

        const accessToken = jwt.sign({ userData }, JWT_ACCESS_SECRET, {
            expiresIn: '20m'
        });

        res
            .status(200)
            .cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 10,
                httpOnly: true
            })
            .json({
                success: true,
                accessToken,
                ...userData
            })
    }

    static createResponse(res, data) {
        res
            .status(200)
            .send({
                success: true,
                ...data
            })
    }

    static createResponseAndDeleteCookie(res, data) {
        res
            .cookie('accessToken', '', {
                maxAge: 1,
                httpOnly: true
            })
            .status(200)
            .send({
                success: true,
                ...data
            })
    }
}