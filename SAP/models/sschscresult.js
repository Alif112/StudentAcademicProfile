var mongoose = require('mongoose');


// User Schema
var SSCResultSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	examtype: {
		type: String
	},
	board: {
		type: String
	},
  passedyear: {
    type: String
  },
	institution: {
		type: String
	},
  gpa:{
    type: String
  }
});

var SSCResult = module.exports = mongoose.model('SSCResult', SSCResultSchema,'secondaryresults');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
