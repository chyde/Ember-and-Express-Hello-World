const express = require('express')
var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();
const app = express()
const getPizzas = require('./controllers/controller');


app.get("/pizzas", function(req, res)  { 
  getPizzas().then(function(pizzaData) {
    // pack and send
    //res.set('Content-Type', 'application/vnd.api+json');
    // NOTE: CORS for testing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");

    // HACK: removes nested object references by stringifying and re-parsing)
    if(! validator.isValid(JSON.parse(JSON.stringify(pizzaData)))) {
      console.warn("Ruh roh!  Bad JSON-API data");
      res.send({ data: [] }); 
    }
    res.send(pizzaData); 
  });
});
 
app.listen(3000, () => console.log('Pizza at port 3000!'));