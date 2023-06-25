const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//term, course, section, instructor, capacity, location, days, start, end

// enum days{"MONDAY",
// "TUESDAY",
// "WEDNESDAY",
// "THURSDAY",
// "FRIDAY"
// }

export const daysSchema = {type: [String], 
    enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], 
    required: true}

export const scheduleSchema = new Schema(
    {
        term: {type: String, required: true},
        course: {type: String, required: true},
        section: {type: String, required: true},
        instructor: {type: String, required: true},
        capacity: {type: String, required: true},
        location: {type: String, required: true},
        days: daysSchema,
        start: {type: String, required: true},
        end: {type: String, required: true}, 
    }
);

// export const schedule_one = new Schema(
//     {
//         day: {type: String, enum: days, required: true},
//         course: {type: , required: true},
//         days: {type: , required: true},
//         start: {type: , required: true},
//         end: {type: , required: true},
//         days: {type: , required: true},
//         days: {type: , required: true},


//     }
// );

module.exports = mongoose.model('Schedule', scheduleSchema);
