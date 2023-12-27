import Service from '../service/bookingService.js';
import Response from '../response/response.js';
import logger from '../logger/logger.js';

class Controller {
  async  BookingController(req, res, next) {
    try {
      const result = await Service.bookingService(req);

      if (!result.sucess) {
        logger.error(`failed to fetch  booking movies details ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }

      logger.info('fetched movies booked details  successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in BookingController: ${err.message}`);
      next(err);
    }
  }
}

export default new Controller();
