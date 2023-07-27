import express from 'express';
import { TeacherPrefController } from '../controllers/teacherpref.controller';
import { isAdmin, getEmail } from '../helpers/auth';
import { validate as validateEndpoint } from 'express-jsonschema';
import preference from '../schemagen/schemas/preference.json';
import type { Preference } from '../schemagen/types/preference';

const router = express.Router();

const teacherPrefController: TeacherPrefController = new TeacherPrefController();

/**
 * Admin: get a specific professors preferences
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const get_all_preferences = async ({ headers }: { headers: any }, res: any): Promise<void> => {
  try {
    if (!headers.authorization) {
      res.status(401).send({ message: 'This endpoint requires authorization header.' });
      return;
    }
    const authToken = headers.authorization;
    const isAdm = await isAdmin(authToken);
    if (!isAdm) {
      res.status(401).send({ message: 'Need admin access.' });
      return;
    }

    const preference: Preference[] = await teacherPrefController.list();
    res.status(200).send(preference);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/all', get_all_preferences);

const update_teacher_preferences = async ({ body }: { headers: any; body: Preference }, res: any): Promise<void> => {
  try {
    const preferences: Preference = await teacherPrefController.update(body);
    res.status(200).send(preferences);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.put('/update', validateEndpoint({ body: preference }), update_teacher_preferences);

const get_my_teacher_preferences = async ({ headers }: { headers: any }, res: any): Promise<void> => {
  try {
    if (!headers.authorization) {
      res.status(401).send({ message: 'This endpoint requires authorization header.' });
      return;
    }
    const authToken = headers.authorization;

    const email = await getEmail(authToken);
    const preferences: Preference = await teacherPrefController.byEmail(email);
    res.status(200).send(preferences);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/my', get_my_teacher_preferences);

const get_teacher_pref_by_email = async (req: any, res: any): Promise<void> => {
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

    const email = req.query.teacherEmail;
    const preferences: Preference = await teacherPrefController.byEmail(email);
    res.status(200).send(preferences);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/email', get_teacher_pref_by_email);

module.exports = router;
