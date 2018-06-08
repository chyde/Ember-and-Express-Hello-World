const express = require('express')

var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();
const app = express()
const SchemaManager = require("./setup");
const getPizzas = require('./controllers/controller');
const settings = require('./settings');


SchemaManager.execute();

app.get("/pizzas", function(req, res)  { 
  getPizzas().then(function(pizzaData) {
    // pack and send
    //res.set('Content-Type', 'application/vnd.api+json');
    // NOTE: CORS for testing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");

    // HACK: removes nested object references by stringifying and re-parsing)
    var dataString = JSON.parse(JSON.stringify(pizzaData));
    var jsonApiPizzas = { data: dataString }
    
    // Validate and handle json api
    if(! validator.isValid(jsonApiPizzas)) {
      console.warn("ERROR: Ruh roh.... bad JSON-API data:", pizzaData);
      res.send({ data: [] }); 
    }

    res.send(jsonApiPizzas); 
  });
});
 
app.listen(3000, () => console.log('Pizza at port 3000!'));