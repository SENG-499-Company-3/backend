import express from 'express';
import { TeacherPrefController } from '../controllers/teacherpref.controller';
import { isAdmin, getEmail } from '../helpers/auth';

const router = express.Router();
const teacherPrefController: TeacherPrefController = new TeacherPrefController();


/**
 * Teacher: Update this teacher's preferences (or create it if it doesn't exist)
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const update = async (req, res) => {
    if(!req.headers.authorization) 
    {
        res.status(400).send({ message: "This endpoint requires authorization header."});
        return;
    }
    if(!req.body.email || !req.body.courses || !req.body.start || !req.body.end || !req.body.peng)
    {
        res.status(400).send({message: "Need to provide all information to update teacher preference."});
        return;
    }
    
    const authToken = req.headers.authorization;
    const email = req.body.email;
    const courses = req.body.courses;
    const start = req.body.start;
    const end = req.body.end;
    const peng = req.body.peng;

    try
    {
        //check user is authorized
        const email_verified = await getEmail(authToken); 
        if(email!=email_verified) throw new Error('Provided email not associated with given auth token.')
        
        await teacherPrefController.update(email,courses,start,end,peng);
        res.status(200).send("Updated teacher preference.");
    } catch (err)
    {
        res.status(401).send({message:"Error updating teacher preference:" + err});
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
    if(!req.headers.authorization) 
    {
        res.status(401).send({message: "This endpoint requires authorization header."});
        return;
    }
    const authToken = req.headers.authorization;
    const isAdm = await isAdmin(authToken);
    if(!isAdm) 
    {
        res.status(401).send({message: "Need admin access."});
        return;
    }
    try
    {
        const response = await teacherPrefController.list();
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
    if(!req.headers.authorization) 
    {
        res.status(401).send({ message: "This endpoint requires authorization header."});
        return;
    }
    const authToken = req.headers.authorization;

    try
    {
        const email = await getEmail(authToken);
        const response = await teacherPrefController.my(email);
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send("Error retrieving teacher preference.");
    }
}
router.get('/my', my);


module.exports = router;
