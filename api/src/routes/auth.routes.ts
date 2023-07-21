import express from 'express';
import { validate as validateEndpoint } from 'express-jsonschema';
import { validate } from 'jsonschema';
import bodyParser from 'body-parser';
import userlogin from '../schemagen/schemas/userlogin.json';
import predicted_class_size from '../schemagen/schemas/predicted_class_size.json';
import user from '../schemagen/schemas/user.json';
import jwt from '../schemagen/schemas/jwt.json';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const authController: AuthController = new AuthController();

router.use(bodyParser.json());

/**
 * Login user
 * (./auth/login)
 *
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  //Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Content can not be empty!' });
  }

  const { email, password } = req.body;

  try {
    const response = await authController.login(email, password);
    res.status(200).send(validate(response, predicted_class_size));
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/login', validateEndpoint({ body: userlogin }), login);

/**
 * Get the current User
 * (./auth/self)
 * @param {*} req
 * @param {*} res
 */
const self = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(400).send({ message: 'Self endpoint requires authorization header.' });
  }

  const token = req.headers.authorization;

  try {
    const response = await authController.self(token);

    res.status(200).send(validate(response, user));
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/self', validateEndpoint({ headers: { ...jwt } }), self);

module.exports = router;
