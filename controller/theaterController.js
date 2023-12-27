import theaterService from '../service/theaterService.js';
import Response from '../response/response.js';
import logger from '../logger/logger.js';

class Controller {
  /** addtheaterController */
  async addtheaterController(req, res, next) {
    try {
      const result = await theaterService.addTheaterService(req);

      if (!result.sucess) {
        logger.error(`failed to addtheater details ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }

      logger.info('theater details added successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in theater controller: ${err.message}`);
      next(err);
    }
  }

  async getTheaterByLocationController(req, res, next) {
    try {
      const result = await theaterService.getTheaterbyLocationService(req);

      if (!result.sucess) {
        logger.error(`failed to get theater details:${result.message}}`);
        return Response.error(req, res, result.status, null, result.message);
      }

      logger.info('theater details fetched successfully for the given location');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in getTheaterByLocationController : ${err.message}`);
      next(err);
    }
  }

  async getSpecficTheaterMoviesController(req, res, next) {
    try {
      const result = await theaterService.getSpecficTheaterbyMoviesService(req);

      if (!result.sucess) {
        logger.error(`failed to get specfic theater movie details:${result.message}}`);
        return Response.error(req, res, result.status, null, result.message);
      }

      logger.info(' movie details fetched successfully for the given theater');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in getSpecficTheaterMoviesController : ${err.message}`);
      next(err);
    }
  }
}

export default new Controller();
