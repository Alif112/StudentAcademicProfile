var mongoose = require('mongoose');


// Project Schema
var ProjectSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	projecttitle: {
		type: String
	},
  projectdetails: {
    type: String
  }
});

var Projects = module.exports = mongoose.model('Projects', ProjectSchema,'projects');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
