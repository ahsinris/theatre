import winston from 'winston';
import UserService from '../service/userService.js';
import message from '../message/message.js';
import httpCodes from '../codes/httpcodes.js';
import Response from '../response/response.js';
import logger from '../logger/logger.js';

class Controller {
  /** sigup Controller */

  async signupController(req, res, next) {
    try {
      const result = await UserService.signupService(req.body);

      if (!result.sucess) {
        logger.error(`Signup failed: ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }

      logger.info('User signed up successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in signup controller: ${err.message}`);
      next(err);
    }
  }
  /** login controller */

  async loginController(req, res, next) {
    try {
      const result = await UserService.loginService(req.body);

      if (!result.sucess) {
        logger.error(`Login failed: ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }
      logger.info('User logged in successfully.');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in login controller: ${err.message}`);
      next(err);
    }
  }

  // /**forget password controller */

  async forgetPasswordController(req, res, next) {
    try {
      const result = await UserService.forgetPasswordService(req);

      if (!result.sucess) {
        logger.error(`reset pasword  mail send failed: ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }
      logger.info('reset password mail send successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in forgetPasswordController: ${err.message}`);
      next(err);
    }
  }

  // /** resetpassword controller*/

  async resetPasswordController(req, res, next) {
    try {
      const result = await UserService.resetPasswordService(req);

      if (!result.sucess) {
        logger.error(`paswword reset  failed: ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }
      logger.info('password successfully reseted.');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in resetPasswordController: ${err.message}`);
      next(err);
    }
  }
  /** get all users */

  async getAllUserController(req, res, next) {
    try {
      const result = await UserService.getAllUsersService(req);
      if (!result.sucess) {
        logger.error(`failed to fetch all users details:${message[123]}`);
        return Response.error(req, res, httpCodes.HTTP_BAD_REQUEST, null, message[123]);
      }
      logger.info('all user details fetched successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in getAllUserController : ${err.message}`);
      next(err);
    }
  }

  /** get specfic user details */

  async getSpecficUserController(req, res, next) {
    try {
      const result = await UserService.getspecficUserService(req);
      if (!result.sucess) {
        logger.error(`failed to fetch  users details:${message[124]}`);
        return Response.error(req, res, httpCodes.HTTP_BAD_REQUEST, null, message[124]);
      }
      logger.info('user details fetched successfully');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in getSpecficUserController : ${err.message}`);
      next(err);
    }
  }

  // /**updateprofile controller */

  async updateController(req, res, next) {
    try {
      const result = await UserService.UpdateProfileService(req);

      if (!result.sucess) {
        logger.error(`update failed: ${result.message}`);
        return Response.error(req, res, result.status, null, result.message);
      }
      logger.info('user details updated  successfully.');
      return Response.sucess(req, res, result.status, result.data, result.message);
    } catch (err) {
      logger.error(`Error in update controller: ${err.message}`);
      next(err);
    }
  }
}

export default new Controller();
