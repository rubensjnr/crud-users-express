import express from 'express';
import * as usersController from '../controllers/usersController';

const router = express.Router();

router.post('/cadastro', usersController.registerController);
router.post('/login', usersController.loginController);

export default router;