#[MEAN-EMPLOYEE APP](https://employee-mean.herokuapp.com) #

## Synopsis

### App-Url: [Heroku](https://employee-mean.herokuapp.com)###
### Api-Documentation: [Heroku](https://employee-mean.herokuapp.com/api-docs)###

### Repository-Url: [Github](https://github.com/tijiragan/mean-employee.git)
  
### Technology Stack
* **[MongoDB](https://www.mongodb.com/)** 
* **[Express 4](http://expressjs.com/)** 
* **[Angular 2](http://angular.io/)** 
* **[Node 6](https://nodejs.org/)** 


### Server ###
* This application server supports primary CRUD operations.
* The API documentation is done using [Swagger-ui](http://swagger.io/swagger-ui/)
* [Mongoose](http://mongoosejs.com) as Object Modelling Tool.
* [Mlab](https://mlab.com/) MongoDataBase as a ervice.
* [Bunyan](https://github.com/trentm/node-bunyan) as Application Logger.
* [AJV](https://github.com/epoberezkin/ajv) as the payload Validator
* [Mocha](https://mochajs.org/) as the testing framework
* [Chai](http://chaijs.com/) as the assertion Library
* [Gulp](http://gulpjs.com/) for task automation.


### Front End ###
* This application front-end is an SPA built with Angular 2 utilizing [Typescript](https://www.typescriptlang.org).
* The application is generated using [Angular Cli](https://cli.angular.io/)
* [Angular Material 2](https://material.angular.io/) as an UI framework.
* [Bootstrap](https://valor-software.com/ng2-bootstrap/) as an UI framework.
* [ng2-smart-table](https://akveo.github.io/ng2-smart-table/) as Data Grid.


## Installation

**To Run the Application**

Run : `npm run start`

or

Run: `npm install` and `node app.js`


Navigate to `http://localhost:3000`


**To Re-build the Application**

Run : `npm run build`
navigate to `http://localhost:3000`



**To build Angular 2 App separately**

Change Directory To ng2-client `cd ng2-client`
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## API Reference
**
Navigate to `http://localhost:3000/api-docs` for api documentation using Swagger-Ui.
**

## Tests

Run `npm test` to test the apis.

## Motivation

This application was created to as an certification project for NodeJs.


## Contributors

None Yet.

## License

Copyright (c) MIT