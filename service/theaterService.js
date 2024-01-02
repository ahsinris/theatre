import theater from '../models/theater.js';
import httpcodes from '../codes/httpcodes.js';
import message from '../message/message.js';
import Movie from '../models/movie.js';

class TheaterService {
  async addTheaterService(req) {
    try {
      const adminId = req.user.user_id;

      const { theater_name, location } = req.body;
      const theater_details = {
        theater_name,
        location,
        admin_id: adminId,
      };

      const result = await theater.create(theater_details);
      return {
        sucess: true,
        status: httpcodes.HTTP_OK,
        message: message[213],
        data: result,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getTheaterbyLocationService(req) {
    try {
      const { location } = req.body;

      const result = await theater.findOne({ where: { location } });
      // console.log(result);

      if (!result) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[126],
        };
      }
      /** remove senstive informatiom like admin id ,created at ,updated at */

      delete result.dataValues.admin_id;
      delete result.dataValues.createdAt;
      delete result.dataValues.updatedAt;
      return {
        sucess: true,
        status: httpcodes.HTTP_OK,
        message: message[219],
        data: result,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getSpecficTheaterbyMoviesService(req) {
    try {
      const { theater_id } = req.body;

      const result = await theater.findOne({ where: { theater_id } });

      if (!result) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[127],
        };
      }
      const findMovies = await Movie.findAll({ where: { theater_id } });

      if (!findMovies) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[128],
        };
      }

      return {
        sucess: true,
        status: httpcodes.HTTP_OK,
        message: message[219],
        data: findMovies,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TheaterService();
