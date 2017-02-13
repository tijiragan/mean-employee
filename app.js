const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const http = require('http');
const employeeLogger = require('./utils/loggerUtil').logger;
const employee = require('./routes/employee');
const app = express();
const config = require('./config/config.json');
const cors = require('cors');
const myEmitter = require('./utils/mongooseConnectionUtil.js').mongooseEvent;
const compression = require('compression');

let env = process.env.NODE_ENV || 'DEV';
//express middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin,x-access-token,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// Employee APP route handler
app.use(config[env].globalRoute, employee);

//swagger options
let options = {
    swaggerDefinition: {
        info: {
            title: 'MEAN Employee CRUD APIS',
            version: '0.0.3'
        },
        basePath: '/app/v1',
        tags: [{
            name: "employee",
            description: "Employee Crud Apis"
        }]
    },
    apis: ['./routes/employee.js']
};
let swaggerDocument = swaggerJSDoc(options);
swaggerDocument.definitions.postDefinition = config[env].EMPLOYEE_CREATE_PAYLOAD_SCHEMA;

swaggerDocument.definitions.putDefinition = config[env].EMPLOYEE_UPDATE_PAYLOAD_SCHEMA;
swaggerDocument.definitions.deleteDefinition = config[env].EMPLOYEE_DELETE_PAYLOAD_SCHEMA;
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
});
// compress static file responses
app.use(compression());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, true, {
    validatorUrl: null
}));

//serve ng2 generated files
app.use(express.static(__dirname + '/ng2-client/dist'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/ng2-client/dist', 'index.html'));
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // logging the error
    employeeLogger.error(err);

    // set locals, only providing error in development
    res.locals.error = req.app.get('env') === 'development' ?
        err : {
            message: err.message
        };

    // render the error page
    res.status(err.status || 500);
    res.send(res.locals.error);
    next();
});
//run express server after establishing connection with mlab
myEmitter.on('mlabConnected', function() {
    let PORT = process.env.PORT || config[env].appPort;
    http.createServer(app).listen(PORT, function() {
        process.stdout.write(`Server is running with HTTP on PORT ${PORT} \n`)
    });
});

module.exports = app;