import express from 'express';
import { TeacherPrefController } from '../controllers/teacherpref.controller';

const router = express.Router();
const teacherPrefController: TeacherPrefController = new TeacherPrefController();


/**
 * Teacher: Update this teacher's preferences (or create it if it doesn't exist)
 * @param {*} req
 * @param {*} res
 * @return {*}
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

/**
 * Admin: get list of all teachers' preferences
 * @param {*} req 
 * @param {*} res 
 * @return {*} ITeacherPref[]
 */
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
 * Teacher: get this teacher's preferences
 * @param {*} req 
 * @param {*} res 
 * @return {*} ITeacherPref
*/
const my = async (req, res) => {
    if(!req.headers.authorization) res.status(400).send({ message: "This endpoint requires authorization header."});
    const token = req.headers.authorization;

    try
    {
        const response = await teacherPrefController.my(token);
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send("Error retrieving teacher preference.");
    }
}
router.get('/my', my);


module.exports = router;
