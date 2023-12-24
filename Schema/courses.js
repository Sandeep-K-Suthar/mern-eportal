const { Schema, model } = require('mongoose');
const courseSchema = new Schema(
    {
        courseName: { type: String, required: true },
        courseImage: { type: String, required: true },
        courseInstructor: { type: String, required: true },
        courseProjects: { type: Array, required: true },
        courseTasks: { type: Array, required: true },
        courseLinks: { type: Array, required: true },
        courseJoined: { type: Date, default: Date.now }
    }
);
const Course = model('Course', courseSchema);
exports.Course = Course;