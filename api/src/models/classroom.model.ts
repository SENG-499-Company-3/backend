const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export const classroomSchema = new Schema(
    {
        BuildingName: {type: String, required: true},
        BuildingId: {type: Number, required: true},
        RoomNumber: {type: Number, required: true},
        Capacity: {type: Number, required: true},
    }
);


module.exports = mongoose.model('Classroom', classroomSchema);
