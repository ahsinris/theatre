import { DataTypes } from 'sequelize';
import sequelize from '../db/mysql.js';
import screen from './screen.js';
import theater from './theater.js';

//* ** this model creates theater seats table */

const seats = sequelize.define('seats', {

  seat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  seat_number: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  screen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  theater_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  is_booked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

/** associations */

screen.hasMany(seats, { foreignKey: 'screen_id' });

seats.belongsTo(screen, { foreignKey: 'screen_id' });
seats.belongsTo(theater, { foreignKey: 'theater_id' });

export default seats;
