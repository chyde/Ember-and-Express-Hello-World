var MongoClient = require('mongodb'),
  ObjectID = require('mongodb').ObjectID;

var assert = require('assert');
const settings = require('../settings');

var PizzaController = {
  collectionName: "pizzas",

  getPizza: function(pizzaId, callback) {
    MongoClient.connect(settings.dbUrl, function(err, client) {
          const db = client.db(settings.databaseName);

          db.collection(PizzaController.collectionName)
            .findOne({
              _id: ObjectID(pizzaId)
            }, function(err, result) {
              console.log("err", err);
              assert.equal(err, null);
              //assert.equal(1, result.result.n);
              console.log("Found the document " + result.name);
              callback(result);
              db.close();
            });
        });
  },

  getPizzas: function() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(settings.dbUrl, function(err, client) {
          const db = client.db(settings.databaseName);

          resolve(db.collection(PizzaController.collectionName).find({}, {
            name: 1,
            description: 1
          }).toArray());
          db.close();
        });
      })
      .then(function(pizzas) {
        var pizzaData = [];

        for (var pizzaIndex = pizzas.length - 1; pizzaIndex >= 0; pizzaIndex--) {
          pizzaData.push(PizzaController.mongoToJsonApi(pizzas[pizzaIndex], "pizza"))
        }

        return pizzaData;
      });
  },

  mongoToJsonApi: function(mongoObject, typeName) {
    console.log("IDS", mongoObject._id, mongoObject.id);
    var mongoId = mongoObject._id ? mongoObject._id : mongoObject.id;
    delete mongoObject._id;

    return {
      id: mongoId.toString(),
      type: typeName,
      attributes: Object.assign({}, mongoObject)
    };
  },

  addPizza: function(pizza, callback) {
    console.log("add pizza", pizza);

    MongoClient.connect(settings.dbUrl, function(err, client) {
      const db = client.db(settings.databaseName);

      db.collection(PizzaController.collectionName)
        .insert({
          name: pizza.name,
          description: pizza.description
        }, function(err, result) {
          var pizzaJsonApi = PizzaController.mongoToJsonApi(result.ops[0], "pizzas");
          callback({ data: pizzaJsonApi });
          db.close();
        });
    });
  },

  updatePizza: function(pizza, callback) {
    MongoClient.connect(settings.dbUrl, function(err, client) {
      const db = client.db(settings.databaseName);

      var myquery = { _id: ObjectID(pizza.id) };
      var newvalues = { $set: { name: pizza.attributes.name, description: pizza.attributes.description } };

      db
      .collection(PizzaController.collectionName)
      .updateOne(myquery, newvalues, function(err, result) {
        if (err) {
          console.log(err);
          throw err;
        }

        callback(result);
        db.close();
      });
    });
  },

  deletePizza: function(pizzaId, callback) {
    MongoClient.connect(settings.dbUrl, function(err, client) {
      const db = client.db(settings.databaseName);

      db.collection(PizzaController.collectionName)
        .deleteOne({
          _id: ObjectID(pizzaId)
        }, function(err, result) {
          console.log("err", err);
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Removed the document" + result);
          callback(result);
          db.close();
        });
    });
  }
}

module.exports = PizzaController;