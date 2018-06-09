var MongoClient = require('mongodb');
const settings = require('./settings');

var SchemaManager = {
  debugMode : true
};

SchemaManager.ensureCollection = function(collName) {
  var myCollectionList;
  MongoClient.connect(settings.dbUrl, function(err, client) {
    var db = client.db(settings.databaseName);
    myCollectionList = db.listCollections({
        name: collName
      })
      .next(function(err, collinfo) {
        if (collinfo) {
          console.log(collName + " exists.");
        } else {  
          console.log(collName + " does not exists.");
          db.createCollection(collName, function(err, collection) { 
            if(err) console.log(collName + " could not be created.");
            else console.log(collName + " created.");
          });
        }
      });
  });
};

SchemaManager.execute = function() {
  console.log("Checking collections...");
  var client = SchemaManager.ensureCollection("pizzas");
}

module.exports = SchemaManager;