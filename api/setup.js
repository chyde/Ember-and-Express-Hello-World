var MongoClient = require('mongodb');

var Setup = function(dbUrl, databaseName, debugMode = false) {
  this.dbUrl = dbUrl;

  this.debugMode = debugMode;
};

Setup.prototype.ensureCollection = function(collName) {
  var client = MongoClient.connect(this.dbUrl, function(err, client) {
    console.log("databaseName", databaseName);
    var db = client.db(databaseName);
    db.listCollections({
        name: collName
      })
      .next(function(err, collinfo) {
        if (collinfo) {
          console.log(collName + " exists");
        } else {
          console.log(collName + " does not exists");
        }
      });
  });
};

Setup.prototype.execute = function() {
  if (this.debugMode) {
    console.log("Starting setup...");
  }

  this.ensureCollection("pizzas");

  if (this.debugMode) {
    console.log("Setup Complete.");
  }
};

module.exports = Setup;