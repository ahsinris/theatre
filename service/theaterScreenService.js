import screen from '../models/screen.js';
import httpcodes from '../codes/httpcodes.js';
import message from '../message/message.js';

class TheaterScreenService {
  async addTheaterScreenService(req) {
    try {
      const adminId = req.user.user_id;

      const { screen_name, theater_id } = req.body;
      const theater_screen_details = {
        screen_name,
        theater_id,
        admin_id: adminId,
      };

      const result = await screen.create(theater_screen_details);
      return {
        sucess: true,
        status: httpcodes.HTTP_OK,
        message: message[214],
        data: result,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TheaterScreenService();
