import express from "express";
import * as usersController from "../controllers/usersController";

const router = express.Router();

router.get('/list-users', usersController.listUsersController)
router.get('/user/:id', usersController.listUserController);
router.put('/list-users/:id', usersController.updateUserController);
router.delete('/list-user/:id', usersController.deleteUserController);

export default router;