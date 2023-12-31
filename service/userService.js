import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import message from '../message/message.js';
import httpCodes from '../codes/httpcodes.js';
import sendMail from '../middleware/nodemailer.js';

// user or admin  can register,login

class UserService {
  /** signup service */

  async signupService(reqData) {
    try {
      const {
        user_name, email_id, phone_number, password, role,
      } = reqData;
      const signUpDetiles = {
        user_name,
        email_id,
        phone_number,
        password,
        role: role || 'user',
      };

      const isUserExist = await user.findAll({ where: { email_id: signUpDetiles.email_id } });
      // console.log(isUserExist)
      if (isUserExist.length) {
        return {
          sucess: false,
          status: httpCodes.HTTP_BAD_REQUEST,
          message: message[100],
        };
      }
      const hashedPassword = await bcrypt.hash(signUpDetiles.password, Number(process.env.SALTROUND));
      signUpDetiles.password = hashedPassword;
      const result = await user.create(signUpDetiles);
      /** removing senstive information(password) from data */
      delete result.dataValues.password;
      return {
        sucess: true,
        status: httpCodes.HTTP_OK,
        message: message[200],
        data: result,
      };
    } catch (e) {
      console.log(e);
    }
  }

  /** * login service */

  async loginService(reqData) {
    try {
      const { email_id, password } = reqData;
      const loginDetiles = {
        email_id,
        password,
      };

      const result = await user.findOne({ where: { email_id: loginDetiles.email_id } });
      // console.log(isUserExist)

      if (!result) {
        return {
          sucess: false,
          status: httpCodes.HTTP_BAD_REQUEST,
          message: message[101],
        };
      }
      const isValidPassword = await bcrypt.compare(password, result.dataValues.password);
      if (!isValidPassword) {
        return {
          sucess: false,
          status: httpCodes.HTTP_BAD_REQUEST,
          message: message[102],
        };
      }

      if (result.dataValues.is_active === 0) {
        return {
          sucess: false,
          status: httpCodes.HTTP_BAD_REQUEST,
          message: message[109],

        };
      }

      if (result.dataValues.is_deleted === 1) {
        return {
          sucess: false,
          status: httpCodes.HTTP_NOT_FOUND,
          message: message[110],
        };
      }

      const payload = {
        user_id: result.dataValues.user_id,
        user_name: result.dataValues.user_name,
        email_id: result.dataValues.email_id,
        phone_number: result.dataValues.phone_number,

      };
      const acess_token = jwt.sign(payload, process.env.SECRETKEY);

      return {
        sucess: true,
        status: httpCodes.HTTP_OK,
        message: message[201],
        data: acess_token,
      };
    } catch (e) {
      console.log(e);
    }
  }
  /** get all user */

  async getAllUsersService(req) {
    try {
      let result = await user.findAll();
      for (const res of result) {
        delete res.dataValues.phone_number
        delete res.dataValues.password
        delete res.dataValues.role
      }

      return {
        sucess: true,
        status: httpCodes.HTTP_OK,
        message: message[217],
        data: result,
      };
    } catch (e) {
      console.log(e);
    }
  }
  /** get specfic user  */

  async getspecficUserService(req) {
    try {
      const userId = req.user.user_id;
      const result = await user.findOne({ where: { user_id: userId } });
      delete result.dataValues.password;
      delete result.dataValues.phone_number;
      delete result.dataValues.role;
      delete result.dataValues.is_active;
      delete result.dataValues.is_deleted;
      return {
        sucess: true,
        status: httpCodes.HTTP_OK,
        message: message[218],
        data: result
      };
    } catch (e) {
      console.log(e);
    }
  }

  // /** update profile service */

  async UpdateProfileService(req) {
    try {
      const userId = req.user.user_id;
      const { email_id } = req.body;

      const update = await user.update(
        { email_id },
        { where: { user_id: userId } },
      );

      if (update > 0) {
        return {
          sucess: true,
          status: httpCodes.HTTP_OK,
          message: message[206],
        };
      }

      return {
        sucess: false,
        status: httpCodes.HTTP_BAD_REQUEST,
        message: message[111],
      };
    } catch (e) {
      console.log(e);
    }
  }

  // /** forget password service */

  async forgetPasswordService(req) {
    try {
      const { email_id } = req.body;

      const isUserExist = await user.findOne({ where: { email_id } });
      if (!isUserExist) {
        return {
          sucess: false,
          status: httpCodes.HTTP_NOT_FOUND,
          message: message
        }
      }

      const { user_id } = isUserExist.dataValues.user_id;

      if (!isUserExist) {
        return {
          sucess: false,
          status: httpCodes.HTTP_BAD_REQUEST,
          message: message[101],
        };
      }

      if (isUserExist.dataValues.is_active === 0) {
        return {
          sucess: false,
          status: httpCodes.HTTP_BAD_REQUEST,
          message: message[109],

        };
      }

      if (isUserExist.dataValues.is_deleted === 1) {
        return {
          sucess: false,
          status: httpCodes.HTTP_NOT_FOUND,
          message: message[110],
        };
      }

      await sendMail(email_id, user_id);

      return {
        sucess: true,
        status: httpCodes.HTTP_OK,
        message: message[208],
      };
    } catch (e) {
      console.log(e);
    }
  }

  // /** reset Password service */

  async resetPasswordService(req) {
    try {
      const user_id = req.params.id;
      // console.log(user_id)
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALTROUND));
      const update_password = await user.update({ password: hashedPassword }, {
        where: {
          user_id,

        },
      });
      if (update_password > 0) {
        return {
          sucess: true,
          status: httpCodes.HTTP_OK,
          message: message[207],
        };
      }

      return {
        sucess: false,
        status: httpCodes.HTTP_BAD_REQUEST,
        message: message[111],
      };
    } catch (e) {
      console.log(e);
    }
  }
}
export default new UserService();
