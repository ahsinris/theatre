import theaterScreenService from '../service/theaterScreenService.js';
import Response from '../response/response.js';
import logger from '../logger/logger.js';

class Controller {
  /** addtheaterController */
  async addtheaterScreenController(req, res, next) {
    try {
      const result = await theaterScreenService.addTheaterScreenService(req);

      if (!result.sucess) {
        logger.error(`failed to addtheater screen details ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }

      logger.info('theater  screen details added successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in theater screen controller: ${err.message}`);
      next(err);
    }
  }
}

export default new Controller();
