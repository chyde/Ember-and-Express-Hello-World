const express = require('express')

var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();
const bodyParser= require('body-parser');
const app = express()
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const SchemaManager = require("./SchemaManager");
const pizzaController = require('./controllers/PizzaController');
const settings = require('./settings');


var addCors = function(res) {
    // NOTE: CORS for testing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
}

SchemaManager.execute();

app.get("/pizzas", function(req, res)  { 
  pizzaController.getPizzas().then(function(pizzaData) {
    addCors(res);

    // HACK: removes nested object references by stringifying and re-parsing)
    var dataString = JSON.parse(JSON.stringify(pizzaData));
    var jsonApiPizzas = { data: dataString }
    
    // Validate and handle json api
    if(! validator.isValid(jsonApiPizzas)) {
      console.warn("ERROR: Bad JSON-API data:", pizzaData);
      res.send({ data: [] }); 
    }

    res.send(jsonApiPizzas); 
  });
});

app.options("/pizzas", function(req, res)  { 
  addCors(res);
  res.send();
});

app.post("/pizzas", function(req, res)  {
  addCors(res);

  pizzaController.addPizza(req.body.data.attributes, function(result) {
    res.send(result);
  })
});


 
app.listen(3000, () => console.log('Pizza at port 3000!'));