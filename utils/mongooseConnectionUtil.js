const config = require('../config/config.json');
const ENV=process.env.NODE_ENV||'DEV';
// Creating mongo client
const mongoose = require('mongoose');
const mongo_uri = config[ENV].DB_CONFIG.MONGO.uri;
mongoose.connect(mongo_uri);
var conn = mongoose.connection;             
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  //emmit event for running express server
  myEmitter.emit('mlabConnected');
  console.log('connected to mongodb at mlab uri: '+mongo_uri);         
});
exports.schema = mongoose.Schema;
exports.mongooseEvent = myEmitter;