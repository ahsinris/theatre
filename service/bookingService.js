import Movie from '../models/movie.js';
import movieSlots from '../models/movieSlot.js';
import httpcodes from '../codes/httpcodes.js';
import message from '../message/message.js';
import user from '../models/user.js';
import booking from '../models/booking.js';
import theater from '../models/theater.js';
import screen from '../models/screen.js';
import seats from '../models/seat.js';

class Service {
  async bookingService(req) {
    try {
      const userId = req.user.user_id;
      const {
        movie_id, movie_slot_id, theater_id, screen_id, seat_id, ticket_count,
      } = req.query;

      const user_details = await user.findOne({ where: { user_id: userId } });

      const theater_exist = await theater.findOne({ where: { theater_id } });
      if (!theater_exist) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[117],
        };
      }
      const screen_exist = await screen.findOne({
        where: {
          screen_id,
          theater_id,
        },
      });

      if (!screen_exist) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[118],
        };
      }

      const movieexist = await Movie.findOne({ where: { movie_id } });

      if (!movieexist) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[105],
        };
      }

      const movieSlotexist = await movieSlots.findOne({ where: { movie_slot_id } });

      if (!movieSlotexist) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[106],
        };
      }

      const movieSlot = await movieSlots.findAll({
        where:
                {
                  movie_slot_id,
                  movie_id,
                },
      });
      if (!movieSlot.length) {
        return {
          sucess: false,
          message: message[108],
          status: httpcodes.HTTP_BAD_REQUEST,
        };
      }

      if (movieSlotexist.dataValues.available_seats < ticket_count) {
        return {
          sucess: false,
          status: httpcodes.HTTP_NOT_FOUND,
          message: message[107],
        };
      }
      const seatNumber = [];
      for (const seat of seat_id) {
        const seatNumberExist = await seats.findOne({ where: { seat_id: seat } });

        if (!seatNumberExist) {
          return {
            sucess: false,
            status: httpcodes.HTTP_NOT_FOUND,
            message: message[119],
          };
        }
        console.log(seatNumberExist.dataValues.is_booked);
        if (seatNumberExist.dataValues.is_booked == true) {
          return {
            sucess: false,
            status: httpcodes.HTTP_BAD_REQUEST,
            message: message[120],
          };
        }
        seatNumber.push(seatNumberExist.dataValues.seat_number);
      }

      const single_ticket = movieSlotexist.dataValues.price;
      const sgst = 0.18 * single_ticket;
      const gst = 0.18 * single_ticket;
      const single_ticket_fare = Number(single_ticket + sgst + gst);
      const total_price = single_ticket_fare * ticket_count;
      // const total_price = Number(ticket_fare + sgst + gst)

      const movie_details = {
        theater_id,
        theater_name: theater_exist.dataValues.theater_name,
        location: theater_exist.dataValues.location,
        screen_id,
        screen_name: screen_exist.dataValues.screen_name,
        seat_id,
        seat_number: seatNumber,
        user_name: user_details.dataValues.user_name,
        user_email: user_details.dataValues.email_id,
        movie_name: movieexist.dataValues.movie_title,
        movie_time: movieexist.dataValues.start_time,
        no_of_seats: ticket_count,
        single_ticket,
        sgst,
        gst,
        single_ticket_fare,
        total_price,
      };

      const ticket_booking_details = {
        movie_id,
        movie_slot_id,
        theater_id,
        screen_id,
        seat_id: JSON.stringify(seat_id),
        user_id: userId,
        ticket_count,
      };

      const ticket_booking = await booking.create(ticket_booking_details);

      return {
        sucess: true,
        status: httpcodes.HTTP_OK,
        message: message[209],
        data: {
          movie_details,
          ticket_booking,
        },
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Service();

// import Stripe from 'stripe';
// const stripe = new Stripe('sk_test_51OCGFbSECz6JYi9q7rKQuANxkSLjtahyHbk6MJnk9lLQq0EH4AUThSyjZW35XLjLb6VlUZaialeNlLxXbCKfHhLs00wh5oV0KX');

// const createCustomer = async () => {
//    Stripe.CustomerCreateParams = {
//     description: 'test customer',
//   };

//    Stripe.Customer = await stripe.customers.create(params);

//   console.log(customer.id);
// };
// createCustomer();
