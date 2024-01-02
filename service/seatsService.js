import seats from '../models/seat.js';
import httpcodes from '../codes/httpcodes.js';
import message from '../message/message.js';

class Service {
  async addSeatNumberService(req) {
    try {
      const adminId = req.user.user_id;
      const { screen_id, theater_id } = req.body;


      // Generate 100 seat numbers
      const seatNumbers = Array.from({ length: 100 }, (_, index) => ({
        seat_number: `Seat-${index + 1}`,
        screen_id,
        theater_id,
        admin_id: adminId,
      }));

      // Use bulkCreate to insert all seats at once
      const result = await seats.bulkCreate(seatNumbers);

      return {
        sucess: true,
        status: httpcodes.HTTP_OK,
        message: message[215],
        data: result,
      };
    } catch (e) {
      console.log(e);
      return {
        sucess: false,
        status: httpcodes.HTTP_INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        data: null,
      };
    }
  }
}

export default new Service();
