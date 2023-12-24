
const { Schema, model } = require('mongoose');
const departmentSchema = new Schema(
    {
        departmentName: { type: String, required: true },
        departmentHead: { type: String, required: true },
        departmentDescription: { type: String, required: true },
        departmentImage: { type: String, required: true },
        departmentEvents: { type: Array, required: true },
        departmentLinks: { type: Array, required: true },
        departmentCalendar: { type: Array, required: true },
        departmentBuilt: { type: Date, default: Date.now }
    }
);
const Department = model('Department', departmentSchema);
module.exports = Department;