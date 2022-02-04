const winston = require('winston');

module.exports = function() {
    process.on('uncaughtException', (error) => {
        winston.error(error.message, error);
        process.exit(1);
    });

    process.on('unhandledRejection', (error) => {
        winston.error(error.message, error);
        process.exit(1);
    });
    
    winston.add(winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [new winston.transports.File({ filename: 'logfile.log' })]
    }));
}