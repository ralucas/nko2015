var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema   = mongoose.Schema;
var _ = require('lodash');
var Q = require('q');

var Models = require('../models');

function MongoService(config) {
  this.config = config || {};

  _.defaults(this.config, {
    host: process.env.MONGO_URL || 'mongodb://localhost/nodedenver'
  });

  var dbUrl = this.config.host;

  var dbEvents = ['error', 'connecting', 'connected', 'open', 'disconnecting', 'disconnected', 'close', 'reconnected', 'fullsetup'];
  dbEvents.forEach(function(evt) {
    db.on(evt, console.log.bind(console, 'MongoDb ' + evt + ' '));
  });

  mongoose.connect(dbUrl);
}

/*
 * param - data -- hash of data to insert {object}
 * param - model -- name of model setup in models -- {string}
 */
MongoService.prototype.add = function(data, model, callback) {
  var deferred = Q.defer();
  // Let's create an instance of the model
  var modelInstance = new Models[model](data);
  
  modelInstance.save(function(err, res) {
    if (err) {
      return deferred.reject(err);
    }
    return deferred.resolve(res);
  });
  return deferred.promise
};

MongoService.prototype.updateOrAdd = function updateOrAdd(data, model) {

  return Q.npost(Models[model], 'findById', [data._id])
    .then(function(instance) {
      if (instance) {
        instance.waitlist.push(data.waitlist);
        return Q.nfcall(instance.save);
      } else {
        var modelInstance = new Models[model](data);
        return Q.nfcall(modelInstance.save);
      }
    });
};

MongoService.prototype.show = function(model, callback) {
    console.log('MongoService.show executed');

    Models[model].find({}, function(err, results) {
      if (err) return callback(err);
      return callback(null, results);
    });
};

MongoService.prototype.findById = function(id, model) {
  console.log(id, model, Models[model]);
  return Q.npost(Models[model], 'findById', [id]); 
};

MongoService.prototype.clearAll = function(callback){
  console.log('MongoService.clearAll executed');

    Models.Employee.remove({}, function(err, results) {
      if (err) return callback(err);
      return callback(null, results);
    });

  return callback(null, 'Destroy');
}

module.exports = MongoService;
