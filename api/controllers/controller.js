var MongoClient = require('mongodb');
var assert = require('assert');
const settings = require('../settings');

var getPizzas = function() {
  return new Promise(function(resolve, reject) {
      var db = MongoClient.connect(settings.dbUrl, function(err, client) {
        const db = client.db(settings.databaseName);

        resolve(db.collection('pizzas').find({}, {
          name: 1,
          description: 1
        }).toArray());
      });
    })
    .then(function(pizzas) {
      var pizzaData = [];

      for (var pizzaIndex = pizzas.length - 1; pizzaIndex >= 0; pizzaIndex--) {
        pizzaData.push(mongoToJsonApi(pizzas[pizzaIndex], "pizza"))
      }

      return pizzaData;
    });
}

var mongoToJsonApi = function(mongoObject, typeName) {
  var mongoId = mongoObject._id;
  delete mongoObject._id;

  return {
    id: mongoId,
    type: typeName,
    attributes: Object.assign({}, mongoObject)
  };
}

var addPizza = function(pizza, callback) {

  MongoClient.connect(settings.dbUrl, function(err, client) {
    const db = client.db(settings.databaseName);

    var newPizza = db.collection('pizzas')
      .insert({
        name: pizza.name,
        description: pizza.description
      }, function(err, result) {
        var pizzaJsonApi = mongoToJsonApi(result.ops[0], "pizza");
        callback({ data: pizzaJsonApi});
        db.close();
      });
  });
} 

module.exports = {
  getPizzas: getPizzas,
  addPizza: addPizza,
  mongoToJsonApi: mongoToJsonApi
}