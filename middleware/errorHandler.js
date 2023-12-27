import joi from 'joi';
import logger from '../logger/logger.js';

class errHandler {
  /** common error handler */
  errorHandler(err, req, res, next) {
    console.log(err);
    logger.error(`error: ${err.message}`);

    return res.status(500).json({
      status: 500,
      message: `internal server error${e}`,
    });
  }

  /** validation error handler */
  Errorhandler(err, req, res, next) {
    if (err instanceof joi.ValidationError) {
      res.status(400).json({ error: 'validation error', details: err.details[0].message });
    } else {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new errHandler();
