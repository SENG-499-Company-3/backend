import express from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
import { isAdmin, getName } from '../helpers/auth';
import { ISchedule } from '../interfaces/Schedule';
const Schedule = require('../models/schedule.model');


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

        await scheduleController.create();
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
        const userName = await getName(authToken);
        const response = await scheduleController.my(userName);
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/my', my);


/**
 * Admin: update the entire schedule
 * @param {*} req
 * @param {*} res
 * @return {*} 
*/
const update = async (req, res) => {
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
        console.log("before json parse\n");
        // let schedules;
        let schedules = {} as ISchedule[];
        // let schedules : ISchedule[4] = {};
        const numSchedules = req.body.length;
        for(let i = 0; i < numSchedules; i++)
        {
            //console.log(req.body[i]);
            //schedules.push(<ISchedule>JSON.parse(req.body[i]));
        // console.log("before json parse\n");

        //     console.log(req.body);
        //     (<ISchedule[]>JSON.parse(req.body));
            schedules[i] = <ISchedule>req.body[i];
            // console.log(schedules[i].Subj);

            //let schedule = new Schedule
        }
        //const schedules = <ISchedule[]>JSON.parse(req.body);
        console.log("After json parse\n");
        await scheduleController.update(schedules, numSchedules);
        res.status(200).send({message: "Updated schedule."});
    } catch (err)
    {
        res.status(401).send({message: "Error creating schedule: " + err});
    }
}
router.get('/update', update);



module.exports = router;
