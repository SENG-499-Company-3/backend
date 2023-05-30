import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController: UserController = new UserController();

// Create a new Tutorial
router.post('/create', userController.create);

// Retrieve all Tutorials
router.get('/list', userController.list);

module.exports = router;
