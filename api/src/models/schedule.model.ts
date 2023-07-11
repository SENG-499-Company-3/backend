const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export const scheduleSchema = new Schema(
    {
        Term: {type: Number, required: true},
        Subj: {type: String, required: true},
        Num: {type: Number, required: true},
        Section: {type: String, required: true},
        Title: {type: String, required: true},
        SchedType: {type: String, required: true},
        Instructor: {type: String, required: true},
        Bldg: {type: String, required: true},
        Room: {type: String, required: true},
        Begin: {type: Number, required: true},
        End: {type: Number, required: true},
        Days: {type: String, required: true},
        StartDate: {type: String, required: true},
        EndDate: {type: String, required: true},
        Cap: {type: Number, required: true},
    }
);


module.exports = mongoose.model('Schedule', scheduleSchema);
