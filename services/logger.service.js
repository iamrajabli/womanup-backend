const { Logger } = require('tslog');

class LoggerService {
    logger;

    constructor() {
        this.logger = new Logger({
            displayFilePath: 'hidden',
            displayFunctionName: false
        });
    }

    log(...args) {
        this.logger.info(...args);
    }


    warn(...args) {
        this.logger.warn(...args);
    }


    error(...args) {
        this.logger.error(...args);
    }
}


module.exports = new LoggerService();