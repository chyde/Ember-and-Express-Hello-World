const express = require('express')
var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();
const app = express()

let pizzaData = 
{
  "data": [
    { 
      "id": "314",
      "type": "pizza",
      "attributes": { 
          "name": "Pepperoni",
          "description": "Best pizza ever" // for real
      }
    },
    { 
      "id": "315",
      "type": "pizza",
      "attributes": { 
          "name": "Cheese",
          "description": "Boring pizza"
      }
    },
    { 
      "id": "316",
      "type": "pizza",
      "attributes": { 
          "name": "Veggie",
          "description": "Salad"
      }
    }
  ]
};

app.get("/pizzas", function(req, res)  { 
    res.set('Content-Type', 'application/vnd.api+json');
    // NOTE: CORS for testing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(! validator.isValid(pizzaData)) console.log("Ruh roh!  Bad JSON-API data");
    res.send(pizzaData);
});

app.listen(3000, () => console.log('Pizza at port 3000!'));