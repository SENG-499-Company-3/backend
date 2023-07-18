import express from 'express';
import { ClassroomController } from '../controllers/classroom.controller';
import { isAdmin, getName } from '../helpers/auth';
import { IClassroom } from '../interfaces/Classroom';

const ClassroomModel = require('../models/classroom.model');
const router = express.Router();
const classroomController: ClassroomController = new ClassroomController();


//adds classroom if doesn't exist, updates its capacity if it does
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
        const classroom = new ClassroomModel({
            BuildingName: req.body.BuildingName,
            BuildingId: req.body.BuildingId,
            RoomNumber: req.body.RoomNumber,
            Capacity: req.body.Capacity
        });

        await classroomController.update(classroom);
        res.status(200).send("Updated/created classroom.");
    } catch (err)
    {
        res.status(401).send({message: ''+err});
    }
}
router.post('/update', update)


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


        const resp = await classroomController.list();
        res.status(200).send(resp);
    } catch (err)
    {
        res.status(401).send({message: ''+err});
    }
}
router.get('/list', list)



module.exports = router;
