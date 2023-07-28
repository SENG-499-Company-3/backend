import express from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from 'express-jsonschema';
import bodyParser from 'body-parser';
import user from '../schemagen/schemas/user.json';
import type { User } from '../schemagen/types/user';
import { isAdmin } from '../helpers/auth';

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
const create = async ({ body }: { body: User }, res: any) => {
  try {
    // Validate request
    const { email, password, name, userrole } = body;

    await userController.create(email, password, name, userrole);
    res.status(200).send('Created user. ');
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
    let users = await userController.list();

    users.forEach(function (user) {
      user.password = '';
      user.token = '';
    });

    res.status(200).send(users);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/list', list);

/**
 * Get a User by ID
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const byId = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'This endpoint requires authorization header.' });
      return;
    }

    const authToken = req.headers.authorization;
    const isAdm = await isAdmin(authToken);
    if (!isAdm) {
      res.status(401).send({ message: 'Need admin access.' });
      return;
    }

    if (!req.query.id) {
      res.status(400).send({ message: 'Need to provide user id in url' });
      return;
    }

    let user: User = await userController.byId(req.query.id);
    user.password = '';
    
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send({ messge: err });
  }
};

router.get('', byId);

module.exports = router;
