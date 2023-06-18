import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController: UserController = new UserController();

// Create a new User (./user/create)
const create = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password || !req.body.name || !req.body.role) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const { email, password, name, role } = req.body;

  try {
    const response = await userController.create(email, password, name, role);

    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/create', create);

// List all Users (./user/list)
const list = async (req, res) => {
  try {
    const response = await userController.list();

    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/list', list);

module.exports = router;
