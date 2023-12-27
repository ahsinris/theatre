import joi from 'joi';
import errHandler from '../middleware/errorHandler.js';

class Validation {
  /** *userValidation */

  /** registerUserValidation */

  async registerValidation(req, res, next) {
    try {
      let schema;

      if (req.body.role && req.body.role.toLowerCase() === 'admin') {
        // Admin OR owner registration
        schema = joi.object({
          user_name: joi.string().required(),
          email_id: joi.string().email().required(),
          phone_number: joi.string().required(),
          password: joi.string().min(1).max(10).required(),
          role: joi.string().valid('admin').required(),
        }).unknown(true);
      } else {
        // User registration
        schema = joi.object({
          user_name: joi.string().required(),
          email_id: joi.string().email().required(),
          phone_number: joi.string().required(),
          password: joi.string().min(1).max(10).required(),
        });
      }

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }
  /** loginUserValidation */

  async loginValidation(req, res, next) {
    try {
      const schema = joi.object({
        email_id: joi.string().email().required(),
        password: joi.string().min(1).max(10).required(),
      });

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      // next(err)
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  // /** forget password */

  async forgetPasswordValidation(req, res, next) {
    try {
      const schema = joi.object({
        email_id: joi.string().email().required(),
      });

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  // /** reset password validation */

  async resetPasswordValidation(req, res, next) {
    try {
      const schema = joi.object({
        password: joi.string().min(1).max(10).required(),
      });

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  // /*** update profile validation */

  async updateProfileValidation(req, res, next) {
    try {
      const schema = joi.object({
        email_id: joi.string().email().required(),
      });

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  /** *add theater validation */

  async addTheaterValidation(req, res, next) {
    try {
      const schema = joi.object({
        theater_name: joi.string().required(),
        location: joi.string().required(),
      });
      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }
  /** find theater by location validation */

  async FindTheaterbyLocationValidation(req, res, next) {
    try {
      const schema = joi.object({
        location: joi.string().required(),
      });
      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }
  /** find specfic theater movies */

  async specficTheaterMovieValidation(req, res, next) {
    try {
      const schema = joi.object({
        theater_id: joi.number().required(),
      });
      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  /** add theater screen validation */
  async addTheaterScreenValidation(req, res, next) {
    try {
      const schema = joi.object({
        screen_name: joi.string().required(),
        theater_id: joi.number().required(),
      });
      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  /** add seat number validation */

  async addseatnumbersValidation(req, res, next) {
    try {
      const schema = joi.object({
        theater_id: joi.number().required(),
        screen_id: joi.number().required(),
      });
      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  /** * addMoviesValidation */

  async addMoviesValidation(req, res, next) {
    try {
      const schema = joi.object({
        movie_title: joi.string().required(),
        release_date: joi.date().required(),
        duration: joi.string().required(),
        total_seats: joi.number().required(),
        theater_id: joi.number().required(),
        screen_id: joi.number().required(),

      });

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  async addMoviesSlotValidation(req, res, next) {
    try {
      const schema = joi.object({
        movie_id: joi.number().required(),
        start_time: joi.date().iso().required(),
        end_time: joi.date().iso().min(joi.ref('start_time')).required(),
        price: joi.number().required(),
        available_seats: joi.number().required(),

      });

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  // /** movieBookingValidation */

  async movieBookingValidation(req, res, next) {
    try {
      const schema = joi.object({
        movie_id: joi.number().required(),
        movie_slot_id: joi.number().required(),
        theater_id: joi.number().required(),
        screen_id: joi.number().required(),
        ticket_count: joi.number().required(),
        seat_id: joi.array().items(joi.number()).min(1).required(),

      });

      await schema.validateAsync(req.query);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }

  /** PaymentValidation */
  async paymentValidation(req, res, next) {
    try {
      const schema = joi.object({
        amount: joi.number().required(),
        quantity: joi.number().required(),
        payment_method_types: joi.string().required(),
        booking_id: joi.number().required(),

        // amount: joi.number().required(),
        // payment_method: joi.string().required(),
        // currency: joi.string().required()

      });

      await schema.validateAsync(req.body);

      next();
    } catch (err) {
      errHandler.Errorhandler(err, req, res, next);
    }
  }
}
export default new Validation();
