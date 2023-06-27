import express from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
import { isAdmin, getEmail } from '../helpers/auth';

const router = express.Router();
const scheduleController: ScheduleController = new ScheduleController();


/**
 * Admin: triggers build schedule
 * Make schedule by running the algorithms (currently just creates a mock schedule)
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const create = async (req, res) => {

    if(!req.headers.authorization) 
    {
        res.status(401).send({ message: "This endpoint requires authorization header."});
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

        const response = await scheduleController.create();
        res.status(200).send("Created schedule.");
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/create', create);



/**
 * Admin list entire schedule
 * Get the entire schedule that has been created from the database
 * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
*/
const list = async (req, res) => {
    if(!req.headers.authorization) 
    {
        res.status(401).send({ message: "This endpoint requires authorization header."});
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
        const response = await scheduleController.list();
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send("Error: " + err);
    }
}
router.get('/list', list);


/** teacher: get my schedule
 *  * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
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
        const response = await scheduleController.my(email);
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/my', my);



module.exports = router;
