var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Reference = new Schema({
	name        : String,
    category    : Number,
	movieTitle  : String,
    description : String,
});

module.exports = mongoose.model('Reference', Reference);