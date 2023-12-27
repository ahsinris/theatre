import express from 'express';
import Validation from '../validation/joi.js';
import tokenverfication from '../authentication/jwt.js';
import isAdmin from '../middleware/admin.js';
import Controller from '../controller/theaterController.js';

const router = express.Router();

router.post('/addTheater', Validation.addTheaterValidation, tokenverfication, isAdmin, Controller.addtheaterController);
router.get('/findTheaterbylocation', Validation.FindTheaterbyLocationValidation, tokenverfication, Controller.getTheaterByLocationController);
router.get('/findSpecficTheaterMovies', Validation.specficTheaterMovieValidation, tokenverfication, Controller.getSpecficTheaterMoviesController);
export default router;
