import express from 'express';
import { TeacherPrefController } from '../controllers/teacherpref.controller';
import { isAdmin, getName, getUid } from '../helpers/auth';
import { validateEndpoint } from 'express-jsonschema';
import { validate } from 'jsonschema';

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
// const get_teacher_preferences = async (
//   { headers, params }: { headers: any; params: { teacher_id: string } },
//   res: any
// ): Promise<void> => {
//   if (!headers.authorization) {
//     res.status(401).send({ message: 'This endpoint requires authorization header.' });
//     return;
//   }
//   const authToken = headers.authorization;
//   const isAdm = await isAdmin(authToken);
//   if (!isAdm) {
//     res.status(401).send({ message: 'Need admin access.' });
//     return;
//   }
//
//   try {
//     const preference_update = undefined;
//     await courseController.update(preference_update);
//     res.status(200).send(validate({ message: 'Updated course.' }, preference));
//   } catch (err) {
//     res.status(401).send({ message: err });
//   }
// };
// router.get('/:teacher_id', get_teacher_preferences);

const update_teacher_preferences = async (
  { headers, body }: { headers: any; body: Preference },
  res: any
): Promise<void> => {
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

  try {
    // await teacherPrefController.update(body. );
    res.status(200).send(validate({ message: 'Updated course.' }, preference));
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.put('/', validateEndpoint({ body: preference }), update_teacher_preferences);

// const get_teacher_preferences = async ({headers}: {headers: any}, res: any): Promise<void> => {
//     if(!headers.authorization)
//     {
//         res.status(401).send({ message: "This endpoint requires authorization header."});
//         return;
//     }
//     const authToken = headers.authorization;
//     const isAdm = await isAdmin(authToken);
//     if(!isAdm)
//     {
//         res.status(401).send({message: "Need admin access."});
//         return;
//     }
//
//     try
//     {
//         const preference_update = undefined;
//         await courseController.update(preference_update);
//         res.status(200).send(validate({message: "Updated course."}, preference));
//     } catch (err)
//     {
//         res.status(401).send({message: err});
//     }
// }
// router.get('/', get_teacher_preferences);
// module.exports = router;
