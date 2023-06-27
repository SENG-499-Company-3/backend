const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const daysSchema = {type: [String], 
    enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], 
    required: true}

export const scheduleSchema = new Schema(
    {
        term: {type: String, required: true},
        course: {type: String, required: true},
        section: {type: String, required: true},
        instructor: {type: String, required: true},
        email: {type: String, required: true},
        capacity: {type: String, required: true},
        location: {type: String, required: true},
        days: daysSchema,
        start: {type: String, required: true},
        end: {type: String, required: true}, 
    }
);


module.exports = mongoose.model('Schedule', scheduleSchema);
