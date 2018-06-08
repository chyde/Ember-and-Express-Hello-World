var MongoClient = require('mongodb');
var assert = require('assert');
const settings = require('../settings');

var getPizzas = function() {
  return new Promise(function(resolve, reject) {
    var db = MongoClient.connect(settings.dbUrl, function(err, client) {
      const db = client.db(settings.databaseName);

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