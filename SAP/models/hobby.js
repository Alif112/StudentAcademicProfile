var mongoose = require('mongoose');


// Project Schema
var HobbySchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	hobbyabout: {
		type: String
	},
  hobbyshortails:{
    type: String
  },
  hobbydetails:{
    type: String
  },
  hobbyurl:{
    type: String
  }

});

var Hobbies = module.exports = mongoose.model('Hobbies', HobbySchema,'hobbies');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
