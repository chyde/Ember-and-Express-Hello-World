var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();

const bodyParser = require('body-parser');

module.exports = function(app) {
  var cors = require('cors');
  //var tokenRouter = express.Router();
  //
  const bodyParser = require('body-parser');

  app.use(bodyParser.json({
    type: 'application/vnd.api+json'
  }));

  app.post("/token", function(req, res) {
    // TODO: implement authentication
    //for(var p in req) { console.log(p);}
    console.log(req.body);

    console.log("Getting auth token"); //: user:" + req.body.identification + " pw:" + "*".repeat(req.body.password.length));
    res.status(200).send('{ "access_token" : "my token" }');
  });
};