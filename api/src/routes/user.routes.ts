import express from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from 'express-jsonschema';
import bodyParser from 'body-parser';
import user from '../schemagen/schemas/user.json';

const router = express.Router();
const userController: UserController = new UserController();

router.use(bodyParser.json());
/**
 * Create a new User
 * (./user/create)
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
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
router.post('/create', validate({ body: user }), create);

/**
 * List all Users
 * (./user/list)
 * @param {*} req
 * @param {*} res
 */
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
