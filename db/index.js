const mongoose = require('mongoose');
const logger = require('../services/logger.service'); 


module.exports = (function(){
    mongoose.connect(process.env.DATABASE_URL, () => {
        logger.log('Connection to DB');
    })
}())