const express = require('express')
var cors = require('cors')

var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();
const bodyParser = require('body-parser');
const app = express()

app.use(cors());

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

const SchemaManager = require("./SchemaManager");
const pizzaController = require('./controllers/PizzaController');
const settings = require('./settings');

var addCors = function(res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}

SchemaManager.execute();

app.get("/pizzas/:pizzaId", function(req, res) {
  pizzaController.getPizza(req.params.pizzaId, function(result) {
    res.status(200)
      .send({data: pizzaController.mongoToJsonApi(result, "pizza")});
  });
});

app.get("/pizzas", function(req, res) {
  pizzaController.getPizzas().then(function(pizzaData) {
    //addCors(res);

    // HACK: removes nested object references by stringifying and re-parsing)
    var dataString = JSON.parse(JSON.stringify(pizzaData));
    var jsonApiPizzas = {
      data: dataString
    }

    // Validate and handle json api
    if (!validator.isValid(jsonApiPizzas)) {
      console.warn("ERROR: Bad JSON-API data:", pizzaData);
      res.send({
        data: []
      });
    }

    res.send(jsonApiPizzas);
  });
});

app.options("/pizzas/*", function(req, res) {
  console.log("OPTION");
  // addCors(res);
  res.send();
});

app.post("/pizzas", function(req, res) {
  //addCors(res);

  pizzaController.addPizza(req.body.data.attributes, function(result) {
    res.send(result);
  })
});

app.patch("/pizzas/:pizzaId", function(req, res) {
  console.log("UPDATING THIS", req.body.data); 

  pizzaController.updatePizza(req.body.data, function(result) {
    res.status(204).send(null);
  })
});

app.delete("/pizzas/:pizzaId", function(req, res) {
  console.log("DELETING A PIZZA");
  console.log(req.params);
  pizzaController.deletePizza(req.params.pizzaId, function(result) {
    res.status(204)
      .send({});
  });
});



app.listen(3000, () => console.log('Pizza at port 3000!'));