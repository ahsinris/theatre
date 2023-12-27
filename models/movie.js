import { DataTypes } from 'sequelize';
import sequelize from '../db/mysql.js';
import user from './user.js';
import theater from './theater.js';
import screen from './screen.js';

const Movie = sequelize.define('Movie', {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATE,
  },
  duration: {
    type: DataTypes.STRING,
  },
  theater_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  screen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  total_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

/** associations */

Movie.belongsTo(user, { foreignKey: 'admin_id' });
Movie.belongsTo(theater, { foreignKey: 'theater_id' });
Movie.belongsTo(screen, { foreignKey: 'screen_id' });

export default Movie;
