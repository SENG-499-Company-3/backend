import express from 'express';
import { TeacherPrefController } from '../controllers/teacherpref.controller';

const router = express.Router();
const teacherPrefController: TeacherPrefController = new TeacherPrefController();


/**
 * Teacher: Create/update teacher pref
 * 
 */
const update = async (req, res) => {
    if(!req.headers.authorization) res.status(400).send({ message: "This endpoint requires authorization header."});
    if(!req.body.email || !req.body.courses || !req.body.start || !req.body.end || !req.body.peng)
    {
        res.status(400).send({message: "Need to provide all information to update teacher preference."});
    }
    
    const token = req.headers.authorization;
    const email = req.body.email;
    const courses = req.body.courses;
    const start = req.body.start;
    const end = req.body.end;
    const peng = req.body.peng;


    try
    {
        await teacherPrefController.update(token,email,courses,start,end,peng);
        res.status(200).send("Updated teacher preference.");
    } catch (err)
    {
        res.status(401).send("Error updating teacher preference.");
    }
}
router.post('/update', update);


const list = async (req, res) => {
    if(!req.headers.authorization) res.status(400).send({message: "This endpoint requires authorization header."});

    const token = req.headers.authorization;

    try
    {
        const response = await teacherPrefController.list(token);
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send({message: "Error retrieving all teachers' prefernces " + err});
    }
}
router.get('/list', list);

/**
 * Teacher: get my teacher prefernces
*/
// const my = async (req, res) => {
//     try
//     {
//         const response = await teacherPrefController.my();
//         res.status(200).send(response);
//     } catch (err)
//     {
//         res.status(401).send(err + "Error retrieving teacher preference.");
//     }
//     router.get('/my', my);
// }
// router.post('/my', my);


module.exports = router;
