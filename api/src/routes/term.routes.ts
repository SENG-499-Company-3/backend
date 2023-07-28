import express from 'express';
import { TermController } from '../controllers/term.controller';
import { isAdmin } from '../helpers/auth';

const router = express.Router();
const termController: TermController = new TermController();

/**
 * Get list of terms
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
const list = async (req, res) => {
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

    const courses = await termController.list();
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('', list);

module.exports = router;
