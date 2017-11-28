var mongoose = require('mongoose');


// Project Schema
var AwardSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	awardtitle: {
		type: String
	},
  awarddetails: {
    type: String
  }
});

var Awards = module.exports = mongoose.model('Awards', AwardSchema,'awards');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
