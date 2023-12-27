import booking from "../models/booking.js";
async function releaseSeatsAndCancelBooking(bookingId) {
    try {
        // Assuming your Sequelize model for bookings is named "Booking"
        const deletedRows = await booking.destroy({
            where: { booking_id: bookingId },
        });

        if (deletedRows > 0) {
            // Clear the timeout (optional)
            clearTimeout(bookingTimeouts[bookingId]);

            console.log(`Booking with ID ${bookingId} has been canceled, and seats released.`);
        } else {
            console.log(`Booking with ID ${bookingId} not found.`);
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export default releaseSeatsAndCancelBooking


