var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Employee schema and model
var reservationSchema = new Schema({
    name : String,
    id : String,
    image_url : String,
    waitlist: [{
    	partyName: String,
   		time: Date,
   		size: Number
   	}]
});


// employeeSchema.methods.findSimilar = function () {
// 	return this.model('Employee').find();
// };

var Reservation = mongoose.model('Reservation', reservationSchema);


// add all new models to this object
var Models = {
	Reservation: Reservation
};

module.exports = Models;