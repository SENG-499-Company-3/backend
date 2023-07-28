import { IClassroom } from '../interfaces/Classroom';

const ClassroomModel = require('../models/classroom.model');

export class ClassroomController {
  /**
   * Admin: adds classroom if doesn't exist, updates its capacity if it does
   *
   * @param {IClassroom} classroom
   * @return {*}  {Promise<void>}
   * @memberof ClassroomController
   */
  async update(classroom: IClassroom): Promise<void> {
    try {
      const classroom_db = new ClassroomModel(classroom);
      const classroom_current = await ClassroomModel.findOne({
        BuildingName: classroom.BuildingName,
        BuildingId: classroom.BuildingId,
        RoomNumber: classroom.RoomNumber
      }).catch((err) => err);
      if (!classroom_current) {
        //insert if the classroom doesn't exist
        await classroom_db.save(classroom_db).catch((err) => err);
      } //replace if exists
      else {
        const doc = await ClassroomModel.findOne({
          BuildingName: classroom.BuildingName,
          BuildingId: classroom.BuildingId,
          RoomNumber: classroom.RoomNumber
        }).catch((err) => err);
        doc.overwrite(classroom_db);
        await doc.save();
      }
    } catch (err) {
      throw new Error('Error updating classroom: ' + err);
    }
  }

  /**
   *  list of all classrooms
   *
   * @return {*}  {Promise<IClassroom[]>}
   * @memberof ClassroomController
   */
  async list(): Promise<IClassroom[]> {
    try {
      const classrooms: IClassroom[] = await ClassroomModel.find().catch((err) => err);
      return classrooms;
    } catch (err) {
      throw new Error('Error getting list of classrooms: ' + err);
    }
  }
}
