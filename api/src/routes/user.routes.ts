import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController: UserController = new UserController();

// Create a new Tutorial
router.post('/create', userController.create);

// Retrieve all Tutorials
router.get('/list', userController.list);

// Self authentication
router.post('/self', userController.self);

module.exports = router;
