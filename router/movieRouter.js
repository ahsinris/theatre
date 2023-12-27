import express from 'express';
import Validation from '../validation/joi.js';
import tokenverfication from '../authentication/jwt.js';
import isAdmin from '../middleware/admin.js';
import Controller from '../controller/movieController.js';

const router = express.Router();

/** add movies only admin can add or modify movie details */
router.post('/addMovies', Validation.addMoviesValidation, tokenverfication, isAdmin, Controller.MovieController);
router.post('/addMovieSlot', Validation.addMoviesSlotValidation, tokenverfication, isAdmin, Controller.MovieSlotController);

/** movie details */
router.get('/showMovies', Controller.ShowMoviesController);

export default router;
