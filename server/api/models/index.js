var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Employee schema and model
var reservationSchema = new Schema({
  name : String,
  _id : String,
  image_url : String,
  waitlist: [{
  	partyName: String,
 		time: { type: Date, default: Date.now },
 		partySize: Number
 	}]
});

var Reservation = mongoose.model('Reservation', reservationSchema);

// add all new models to this object
var Models = {
	Reservation: Reservation
};

module.exports = Models;
