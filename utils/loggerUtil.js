
const bunyan = require('bunyan');

module.exports = {
	logger: bunyan.createLogger({
		name: 'Employee_APP Logger',
		streams: [
			{
				type: 'rotating-file',
				level: 'debug',
				path: './logs/Employee_APP-debug-' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + '.log',
				period: '1d'
			},
			{
				type: 'rotating-file', 
				level: 'error',
				path: './logs/Employee_APP-error-' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + '.log',
				period: '1d'
			},
			{
				type: 'rotating-file',
				level: 'info',
				path: './logs/info-data.log'
			},
			{
				type: 'rotating-file',
				level: 'warn',
				path: './logs/warn-data.log'
			}
		]
	})
};
