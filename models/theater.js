import { DataTypes } from 'sequelize';
import sequelize from '../db/mysql.js';
import user from './user.js';

//* ** this model creates theater table */

const theater = sequelize.define('theater', {

  theater_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  theater_name: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
});

/** associations */
theater.belongsTo(user, { foreignKey: 'admin_id' });

export default theater;
