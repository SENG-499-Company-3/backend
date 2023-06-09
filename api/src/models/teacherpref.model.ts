const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const teacherPrefSchema = new Schema(
    {
        email: { type: String, required: true},
        courses: { type: [String], required: true},
        start: { type: String, required: true},
        end: { type: String, required: true},
        peng: { type: String, required: true}
    }
);

module.exports = mongoose.model('TeacherPref', teacherPrefSchema);
