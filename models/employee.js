const mongoose = require('mongoose');
let Schema = require('../utils/mongooseConnectionUtil').schema;
var employeeShema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    dob: {
        type: String,
        default: '',
        required: true
    },
    department: {
        type: String,
        default: '',
        required: true
    },
    gender: {
        type: String,
        default: '',
        required: true
    },
    age: {
        type: String,
        default: '',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
employeeShema.pre('save', function (next) {
    // get current date
    var currentDate = new Date();

    // change updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Employee = mongoose.model('Employee', employeeShema);
var exports = module.exports = Employee;