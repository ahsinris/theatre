import seatsService from '../service/seatsService.js';
import Response from '../response/response.js';
import logger from '../logger/logger.js';

class Controller {
  /** addtheaterController */
  async addseatNumberController(req, res, next) {
    try {
      const result = await seatsService.addSeatNumberService(req);

      if (!result.sucess) {
        logger.error(`failed to addseatnumber details ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }

      logger.info('seat number added successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in addseatNumberController : ${err.message}`);
      next(err);
    }
  }
}

export default new Controller();
