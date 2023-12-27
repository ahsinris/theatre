import express from 'express';
import Validation from '../validation/joi.js';
import Controller from '../controller/userController.js';
import tokenverfication from '../authentication/jwt.js';
import isAdmin from '../middleware/admin.js';

const router = express.Router();

router.post('/register', Validation.registerValidation, Controller.signupController);
router.post('/login', Validation.loginValidation, Controller.loginController);
router.get('/getallusers', tokenverfication, isAdmin, Controller.getAllUserController);
router.get('/getspecficUser', tokenverfication, Controller.getSpecficUserController);
router.put('/UpdateProfile', tokenverfication, Validation.updateProfileValidation, Controller.updateController);
router.post('/forgetPassword', Validation.forgetPasswordValidation, Controller.forgetPasswordController);
router.put('/resetPassword/:id', Validation.resetPasswordValidation, Controller.resetPasswordController);

export default router;
