'use strict';

let util = require('util');

function employeeError(errMessage) {
	Error.call(this); // calling super class constructor
	Error.captureStackTrace(this, this.constructor); // capturing the stack trace
	this.name = this.constructor.name; // setting error name
	this.message = errMessage; // setting error message
	this.status = 400; // setting error status
}

// Inheriting the Error class
util.inherits(employeeError, Error);

module.exports = employeeError;
