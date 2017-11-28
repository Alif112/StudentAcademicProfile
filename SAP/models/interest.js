var mongoose = require('mongoose');


// Project Schema
var InterestSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	interestabout: {
		type: String
	},
  interestshortails:{
    type: String
  },
  interestdetails:{
    type: String
  },
  interesturl:{
    type: String
  }

});

var Interests = module.exports = mongoose.model('Interests', InterestSchema,'interests');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
