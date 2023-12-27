import seats from '../models/seat.js';
import httpcodes from '../codes/httpcodes.js';
import message from '../message/message.js';

class Service {
  async addSeatNumberService(req) {
    try {
      const adminId = req.user.user_id;
      const { screen_id, theater_id } = req.body;

      // // this Generate 100 seat numbers
      // const seatNumbers = Array.from({ length: 100 }, (_, index) => `Seat-${index + 1}`);

      // // Create an array to store the created seat objects
      // const createdSeats = [];

      // // Save each seat to the database
      // for (const seat_number of seatNumbers) {
      //     const seat_details = {
      //         seat_number: seat_number,
      //         screen_id: screen_id,
      //         theater_id: theater_id,
      //         admin_id: adminId
      //     };

      //     const result = await seats.create(seat_details);
      //     createdSeats.push(result);
      // }
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
