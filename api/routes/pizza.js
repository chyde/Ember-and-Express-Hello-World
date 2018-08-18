var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();

const pizzaController = require('../controllers/PizzaController');
const bodyParser = require('body-parser');

module.exports = function(app) {
  app.get("/pizzas/:pizzaId", function(req, res) {
    pizzaController.getPizza(req.params.pizzaId, function(result) {
      res.status(200)
        .send({
          data: pizzaController.mongoToJsonApi(result, "pizza")
        });
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

  app.get("/pizzas", function(req, res) {
    //addCors(res);

    pizzaController.addPizza(req.body.data.attributes, function(result) {
      res.send(result);
    })
  });

  app.post("/pizzas", function(req, res) {
    pizzaController.addPizza(req.body.data.attributes, function(results) {
      
      if (!validator.isValid(results)) {
        console.warn("ERROR: Bad JSON-API data:", results);
      }
      else{
        console.log("results", results);
        res.status(204).send(results);
      }
    });
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
}