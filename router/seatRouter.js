import express from 'express';
import Validation from '../validation/joi.js';
import tokenverfication from '../authentication/jwt.js';
import isAdmin from '../middleware/admin.js';
import Controller from '../controller/seatController.js';

const router = express.Router();

router.post('/addSeatNumber', Validation.addseatnumbersValidation, tokenverfication, isAdmin, Controller.addseatNumberController);

export default router;
