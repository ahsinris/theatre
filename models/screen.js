import { DataTypes } from 'sequelize';
import sequelize from '../db/mysql.js';
import theater from './theater.js';

//* ** this model creates theater screens table */

const screen = sequelize.define('screen', {

  screen_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  screen_name: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  theater_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
});

/** associations */
theater.hasMany(screen, { foreignKey: 'theater_id' });

screen.belongsTo(theater, { foreignKey: 'theater_id' });

export default screen;
