import express from 'express';
import { validate } from 'express-jsonschema';
import bodyParser from 'body-parser';
import userlogin from '../schemagen/schemas/userlogin.json';
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
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/login', validate({ body: { ...userlogin } }), login);

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

    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/self', validate({ body: { id: 'jwt.json', ...userlogin } }), self);

module.exports = router;
