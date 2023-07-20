const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const teacherPrefSchema = new Schema(
    {
        _id: {type: String, required: true},
        email: { type: String, required: true},
        // course_ids: [{ type: [String], required: true}],
        courses: { type: [String], required: true},
        start: { type: String, required: true},
        end: { type: String, required: true},
        peng: { type: Boolean, required: true},
        last_updated: {type: String}
    }
);

module.exports = mongoose.model('TeacherPref', teacherPrefSchema);
