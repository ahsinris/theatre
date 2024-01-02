import { DataTypes } from 'sequelize';
import sequelize from '../db/mysql.js';
import Movie from './movie.js';
import movieSlots from './movieSlot.js';
import user from './user.js';
import seats from './seat.js';
import screen from './screen.js';
import theater from './theater.js';
import Payment from './payment.js';

const booking = sequelize.define('booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movie_slot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  theater_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  screen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seat_id: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  ticket_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  booking_status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  payment_id: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
});

/** Associations */

booking.belongsTo(Movie, { foreignKey: 'movie_id' });
booking.belongsTo(movieSlots, { foreignKey: 'movie_slot_id' });
booking.belongsTo(user, { foreignKey: 'user_id' });
booking.belongsTo(Payment, { foreignKey: 'payment_id' });
booking.belongsTo(theater, { foreignKey: 'theater_id' });
booking.hasMany(seats, { foreignKey: 'seat_id' });
booking.belongsTo(screen, { foreignKey: 'screen_id' });

Movie.hasMany(booking, { foreignKey: 'movie_id' });
user.hasMany(booking, { foreignKey: 'user_id' });
Payment.hasMany(booking, { foreignKey: 'payment_id' });

export default booking;
