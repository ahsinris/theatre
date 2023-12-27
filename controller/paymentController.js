import service from '../service/paymentService.js'
import logger from '../logger/logger.js'
import Response from '../response/response.js'
import Payment from '../models/payment.js';
import Csv from '../middleware/csvReport.js'
import Stripe from 'stripe';
import booking from '../models/booking.js';
import movieSlots from '../models/movieSlot.js';
import Movie from '../models/movie.js';
import user from '../models/user.js';
import Sequelize from 'sequelize';
import seats from '../models/seat.js';
const stripe = new Stripe(process.env.SECRET_KEY);
import theater from '../models/theater.js';
import screen from '../models/screen.js';

class Controller {
    async PaymentController(req, res, next) {
        try {

            const result = await service.paymentService(req)

            if (!result.success) {
                logger.error(`payment failed: ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }
            logger.info('payment successfully.');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in Payment controller: ${err.message}`);
            next(err)
        }
    }

    async sucessPayment(req, res, next) {
        try {

            const uuid = req.query.u_id
            const payment_details = await Payment.findOne({
                where: {
                    uuid: uuid
                }
            })
            const stripeid = payment_details.dataValues.stripe_payment_id
            const bookingId = payment_details.dataValues.booking_id
            const paymentId = payment_details.dataValues.payment_id

            /** get the payment payload using stripeid */
            const sessionDeatils = await stripe.checkout.sessions.retrieve(stripeid
            );
            // const paymenStatus = payment_details.dataValues.payment_status
            // console.log(sessionDeatils)
            // const payment_status = sessionDeatils.payment_status


            /** update payment status on the payment table */

            const updatePaymentDetails = {
                order_status: "confirmed",
                payment_status: sessionDeatils.payment_status,
                payment_method: sessionDeatils.payment_method
            }


            const updatePayment = await Payment.update(updatePaymentDetails, { where: { uuid: uuid } })


            /**update booking status on the booking table */

            const moviebookingDetails = {
                booking_status: "booked",
                payment_id: paymentId

            }


            const moviebooking = await booking.update(moviebookingDetails, {
                where: {
                    booking_id: bookingId
                }
            })


            const movieDetails = await booking.findOne({
                where: {
                    booking_id: bookingId
                }
            })

            const seatIdsString = movieDetails.dataValues.seat_id;
            // Convert seat IDs to integers
            const seat_id = JSON.parse(seatIdsString).map(Number);

            /**update on seat table seat is booked */

            for (const seat of seat_id) {
                const updateSeatStatus = await seats.update({ is_booked: true }, {
                    where: {
                        seat_id: seat
                    }
                })

            }



            // const updateSeatStatus = await seats.update({ is_booked: true }, {
            //     where: {
            //         seat_id: { [Sequelize.Op.in]: seat_id }
            //     }
            // })

            const userId = movieDetails.dataValues.user_id

            const movieId = movieDetails.dataValues.movie_id

            const theater_id = movieDetails.dataValues.theater_id

            const screen_id = movieDetails.dataValues.screen_id

            const movieSlotId = movieDetails.dataValues.movie_slot_id

            /**find the userdaetails using userid */
            const userDetails = await user.findOne({
                where: {
                    user_id: userId
                }
            })
            /**find the movie details using movieid */

            const findmovie = await Movie.findOne({
                where: {
                    movie_id: movieId

                }
            })

            /**find the movie slot details using movie slot id */


            const movieSlotDetails = await movieSlots.findOne({
                where: {
                    movie_slot_id: movieSlotId
                }
            })

            /**find the theater details using theater id**/

            const theater_details = await theater.findOne({ where: { theater_id: theater_id } })

            /**find the screen details using screen id */

            const screen_details = await screen.findOne({ where: { screen_id: screen_id } })

            /**find the seat details using seat id  */
            let seatNumber = []

            for (const seat of seat_id) {
                const seat_deatils = await seats.findOne({ where: { seat_id: seat } })
                seatNumber.push(seat_deatils.dataValues.seat_number)
            }

            let seat_number = seatNumber.join(' ')



            /**reduce the booked ticket count on movie slot table */

            const reduceTicketCount = (movieSlotDetails.dataValues.available_seats) - (movieDetails.dataValues.ticket_count)

            const updateTicketCount = await movieSlots.update({ available_seats: reduceTicketCount }, {
                where: {
                    movie_slot_id: movieSlotId

                }
            })

            const TicketBookingDetails = {
                userId: userId,
                userName: userDetails.dataValues.user_name,
                emailId: userDetails.dataValues.email_id,
                phoneNumber: userDetails.dataValues.phone_number,
                theater_name: theater_details.dataValues.theater_name,
                location: theater_details.dataValues.location,
                screen_name: screen_details.dataValues.screen_name,
                seat_number: seat_number,
                movieTitle: findmovie.dataValues.movie_title,
                releaseDate: findmovie.dataValues.release_date,
                duration: findmovie.dataValues.duration,
                movieSlotId: movieDetails.dataValues.movie_slot_id,
                movieStartTime: movieSlotDetails.dataValues.start_time,
                movieEndTime: movieSlotDetails.dataValues.end_time,
                ticketCount: movieDetails.dataValues.ticket_count,
                bookingId: bookingId,
                bookingStatus: movieDetails.dataValues.booking_status,
                paymentId: movieDetails.dataValues.payment_id,
                transactionId: sessionDeatils.id,
                totalAmount: sessionDeatils.amount_total,
                status: sessionDeatils.amount_total,
                paymentIntent: sessionDeatils.payment_intent,
                paymentMethodTypes: sessionDeatils.payment_method_types,
                paymentStatus: sessionDeatils.payment_status
            }

            console.log(TicketBookingDetails)

            let csvData = Csv.csvdata(TicketBookingDetails)
            let csvReport = Csv.csvreportGenerator(csvData)


            /**
            logger.info('movie details added successfully');
            return Response.sucess(req, res, result.status, result.data, result.message) */


            return res.status(200).json({
                status: 200,
                message: "payment sucess",
                query: {
                    sessionDeatils,
                    updatePayment
                },
            })

        }
        catch (err) {
            console.log("error in sucess" + err)
            logger.error(`Error in sucessPayment controller: ${err.message}`);
            next(err)
        }
    }

    async cancelPayment(req, res, next) {
        try {
            const uuid = req.query.u_id

            const payment_details = await Payment.findOne({
                where: {
                    uuid: uuid
                }
            })

            const stripeid = payment_details.dataValues.stripe_payment_id

            const bookingId = payment_details.dataValues.booking_id


            const paymentId = payment_details.dataValues.payment_id

            // const paymenStatus = payment_details.dataValues.payment_status




            const sessionDeatils = await stripe.checkout.sessions.retrieve(stripeid
            );
            // const payment_status = sessionDeatils.payment_status


            /** update payment status on the payment table */

            const updatePaymentDetails = {
                order_status: "failed",
                payment_status: sessionDeatils.payment_status,
                payment_method: sessionDeatils.payment_method
            }


            const updatePayment = await Payment.update(updatePaymentDetails, { where: { uuid: uuid } })


            /**update booking status on the booking table */

            const moviebookingDetails = {
                booking_status: "failed",
                payment_id: paymentId

            }

            const moviebooking = await booking.update(moviebookingDetails, {
                where: {
                    booking_id: bookingId
                }
            })

            const movieDetails = await booking.findOne({
                where: {
                    booking_id: bookingId
                }
            })

            return res.status(400).json({
                status: 400,
                message: "payment was cancelled",

            })

        }
        catch (err) {
            console.log("error in cancel payments" + err)

            logger.error(`Error in cancelPayment controller: ${err.message}`);
            next(err)
        }
    }
}


export default new Controller()