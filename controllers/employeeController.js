const Employee = require('../models/employee');
const employeeError = require('../errorHandlers/employeeError');
const logger = require('../utils/loggerUtil').logger;
const resMessage = require('../config/res_messages.json');
const env = process.env.NODE_ENV || 'DEV';
const config = require('../config/config.json');
const ajv = require('ajv')({
    allErrors: true
});
/**
 *
 * This function is used as a callback to employee API Routes. It utilizes employeeShema as an Odm to connect to mongo database. It utilizes employeeError to log errors.
 *
 */
const employeeMask = {
    __v: false,
    _id: false,
    created_at: false,
    updated_at: false
};
module.exports = {
    /**
     * validates payload for apis.
     * @param req {Object|Array} The REST data.
     * @param res {Object|Array} The REST data.
     * @param next {function} passes context to next middleware.
     */
    "payloadValidate": (req, res, next) => {
        if (req.body === undefined) {
            next(new employeeError(resMessage.InvalidPayLoad));
            return;
        }

        // compiling JSON schema using AJV
        let validate = ajv.compile(config[env].EMPLOYEE_CREATE_PAYLOAD_SCHEMA);
        // validating employee data
        let valid = validate(req.body);

        if (!valid) {
            // valid employee data
            next(new employeeError(validate.errors));
            return;
        } else {
            next();
        }

    },
    /**
     * get employee api callback.
     * @param req {Object|Array} The REST data.
     * @param res {Object|Array} The REST data.
     * @param next {function} passes context to next middleware.
     */
    "get": (req, res, next) => {
        logger.info('employee read request');
        Employee.find({}, employeeMask, function(err, employees) {
            if (err) {
                logger.error('unable to get employees', err);
                next(new employeeError(err.errmsg));
                return;
            }
            logger.info('Employees fetched successfully!');
            res.json({
                "message": resMessage.getEmployeeSuccess,
                "employees": employees
            });
        });
    },
    /**
     * post employee api callback.
     * @param req {Object|Array} The REST data.
     * @param res {Object|Array} The REST data.
     * @param next {function} passes context to next middleware.
     */
    "post": (req, res, next) => {
        logger.info('employee create request');
        var newEmployee = new Employee({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            department: req.body.department,
            gender: req.body.gender,
            age: req.body.age,
        })
        newEmployee.save(function(err, employee) {
            if (err) {
                logger.error('unable to save employee', err);
                next(new employeeError(err.errmsg));
                return;
            }
            logger.info('Employee Added successfully!');
            res.send({
                "message": resMessage.insertEmployeeSuccess,
                "employee": employee.email
            });
        });
    },
    /**
     * delete employee api callback.
     * @param req {Object|Array} The REST data.
     * @param res {Object|Array} The REST data.
     * @param next {function} passes context to next middleware.
     */
    "delete": (req, res, next) => {
        logger.info('employee delete request');
        if (req.body === undefined) {
            next(new employeeError(resMessage.InvalidPayLoad));
            return;
        }

        // compiling JSON schema using AJV
        let validate = ajv.compile(config[env].EMPLOYEE_DELETE_PAYLOAD_SCHEMA);
        // validating employee data
        let valid = validate(req.body);

        if (!valid) {
            // valid employee data
            next(new employeeError(validate.errors));
            return;
        }
        Employee.findOneAndRemove({
            email: req.body.email
        }, function(err) {
            if (err) {
                logger.error('unable to delete employee', err);
                next(new employeeError(err.errmsg));
                return;
            }
            res.send({
                "message": resMessage.deleteEmployeeSuccess,
                "employee": req.body.email
            });
        });
    },
    /**
     * put employee api callback.
     * @param req {Object|Array} The REST data.
     * @param res {Object|Array} The REST data.
     * @param next {function} passes context to next middleware.
     */
    "put": (req, res, next) => {
        logger.info('employee update request');
        if (req.body === undefined) {
            next(new employeeError(resMessage.InvalidPayLoad));
            return;
        }
        // compiling JSON schema using AJV
        let validate = ajv.compile(config[env].EMPLOYEE_UPDATE_PAYLOAD_SCHEMA);
        // validating employee data
        let valid = validate(req.body);
        if (!valid) {
            // valid employee data
            next(new employeeError(validate.errors));
            return;
        }
        Employee.findOne({
            email: req.body.email
        }, function(err, employee) {
            if (err || employee === null) {
                logger.error('unable to edit employee', err);
                err = err || 'employee does not exist';
                next(new employeeError(err.errmsg));
                return;
            }
            for (var key in req.body.update) {
                employee[key] = req.body.update[key];
            }

            employee.save(function(err) {
                if (err) {
                    logger.error('unable to update employee', err);
                    next(new employeeError(err.errmsg));
                    return;
                }
                logger.info('Employee updated successfully!');
                res.send({
                    "message": resMessage.updateEmployeeSuccess,
                    "employee": employee.email
                });
            });

        });
    }
}