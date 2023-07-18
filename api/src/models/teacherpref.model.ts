const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const teacherPrefSchema = new Schema(
    {
        email: { type: String, required: true},
        course_ids: [{ type: [String], required: true}],
        peng: { type: Boolean, required: true}
    }
);

module.exports = mongoose.model('TeacherPref', teacherPrefSchema);
