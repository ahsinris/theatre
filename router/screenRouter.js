import express from 'express';
import Validation from '../validation/joi.js';
import tokenverfication from '../authentication/jwt.js';
import isAdmin from '../middleware/admin.js';
import Controller from '../controller/theaterScreenController.js';

const router = express.Router();

router.post('/addTheaterScreen', Validation.addseatnumbersValidation, tokenverfication, isAdmin, Controller.addtheaterScreenController);

export default router;
