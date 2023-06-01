import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const authController: AuthController = new AuthController();

//Login user
router.post('/login', authController.login);

module.exports = router;

