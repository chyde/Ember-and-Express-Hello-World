var MongoClient = require('mongodb');
const settings = require('./settings');

var SchemaManager = {
  /**
   * Ensures that acollection exists and creates it if it does not
   * @param  {string} collName Name of collection
   * @return {undefined}
   */
  ensureCollection : function (collName) {
    var myCollectionList;
    MongoClient.connect(settings.dbUrl, function(err, client) {
      var db = client.db(settings.databaseName);
      myCollectionList = db.listCollections({
          name: collName
        })
        .next(function(err, collinfo) {
          if (collinfo) {
            console.log("Collection '" + collName + "' exists.");
          } else {
            console.log("Collection '" + collName + "' does not exists.");
            db.createCollection(collName, function(err, collection) {
              if (err) console.log("Collection '" + collName + "' could not be created.");
              else console.log("Collection '" + collName + "' created.");
            });
          }
        });
    });
  },

  /**
   * Executes all of our schema management, for existing or new DBs
   * @return {undefined}
   */
  execute : function () {
    console.log("Checking collections...");
    var client = SchemaManager.ensureCollection("pizzas");
  }
}

module.exports = SchemaManager;