var mongoose = require('mongoose');


// Project Schema
var PublicationSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	publicationtitle: {
		type: String
	},
	publicationshort:{
		type:String
	},
  publicationdetails:{
    type:String
  },
  publicationplace:{
    type:String
  },
  publicationurl: {
    type: String
  }

});

var Publications = module.exports = mongoose.model('Publications', PublicationSchema,'publications');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
