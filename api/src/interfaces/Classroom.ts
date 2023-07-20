import { Document } from 'mongodb';


export interface IClassroom extends Document
{
    BuildingName: String,
    BuildingId: Number,
    RoomNumber: Number
    Capacity: Number
}