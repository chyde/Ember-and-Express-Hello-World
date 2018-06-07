var MongoClient = require('mongodb');
var assert = require('assert');

var getPizzas = function() {
  return new Promise(function(resolve, reject) {
    var db = MongoClient.connect(dbUrl, function(err, client) {
      const db = client.db(databaseName);

      db.listCollections({name: "pdfdfizzas"})
        .next(function(err, collinfo) {
            if (collinfo) {
                console.log("pizzas Exists");
            }
        });

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