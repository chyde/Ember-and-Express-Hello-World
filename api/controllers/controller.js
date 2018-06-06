var MongoClient = require('mongodb');
var assert = require('assert');

// server.js
const port = 3000;
const databaseName = 'bb';
const dbUrl = 'mongodb://127.0.0.1:27017/';

var getPizzas = function() {
  return new Promise(function(resolve, reject) {
    var db = MongoClient.connect(dbUrl, function(err, client) {
      
      console.log("connecting to ", databaseName);
      const db = client.db(databaseName);
      resolve(db.collection('pizzas').find({}, {name: 1, description: 1}).toArray());
    });
  })
  .then(function(pizzas) {
    var pizzaData = [];
    for (var pizzaIndex = pizzas.length - 1; pizzaIndex >= 0; pizzaIndex--) {
      var pizza = pizzas[pizzaIndex];
      var pizzaId = pizza._id;
      pizza._id = undefined;

      pizzaData.push({
        id: pizzaId,
        type: "pizza",
        attributes: Object.assign({}, pizza)
      });
    }
    
    return pizzaData;
  });
}

 
module.exports = getPizzas;