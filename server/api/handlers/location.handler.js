'use strict';

function LocationHandler() {}

LocationHandler.prototype.get = function get(req, res) {
  console.log(req.query);
  res.status(200).json({message: 'Location get working'});
};

module.exports = LocationHandler;

