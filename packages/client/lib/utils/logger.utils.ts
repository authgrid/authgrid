import winston from 'winston';
import expressWinston from 'express-winston';

export const expressLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});
