var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var basicAuthMongoose = require('basic-auth-mongoose');

var Account = new Schema({
	username: String,
	password: String
});

Account.plugin(basicAuthMongoose);

module.exports = mongoose.model('Account', Account);