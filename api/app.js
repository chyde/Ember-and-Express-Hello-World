const express = require('express')
var cors = require('cors')
var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();
const bodyParser = require('body-parser');
const app = express(); 

app.use(cors());

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

const SchemaManager = require("./SchemaManager");

var addCors = function(res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}

SchemaManager.execute();

require('./routes/pizza')(app);
require('./routes/auth')(app); 

app.listen(3000, () => console.log('Pizza at port 3000!'));