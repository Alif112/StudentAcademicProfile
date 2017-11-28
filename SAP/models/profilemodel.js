var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var ProfileSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	profilename: {
		type: String
	},
	university: {
		type: String
	},
	registration: {
		type: String
	},
	dept: {
		type: String
	},
	dob: {
		type: String
	},
	father: {
		type: String
	},
	mother: {
		type: String
	},
	gender: {
		type: String
	},
	maritalstatus: {
		type: String
	},
	permanentaddress: {
		type: String
	},
	temporaryaddress: {
		type: String
	},
	primaryoccupation: {
		type: String
	},
	secondaryoccupation: {
		type: String
	},
	phonenumber: {
		type: String
	},
	email: {
		type: String
	},
	language: {
		type: String
	},
	workexperience: {
		type: String
	},
	overview: {
		type: String
	},
	photo :{
		type:String
	}


});

var Profile = module.exports = mongoose.model('Profile', ProfileSchema,'profiles');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
