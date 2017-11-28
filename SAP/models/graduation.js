var mongoose = require('mongoose');


// Project Schema
var GraduationSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	coursecode: {
		type: String
	},
  coursetitle: {
    type: String
  },
  semester: {
    type: String
  },
  coursecredit: {
    type: String
  },
	gradepoint:{
		type:String
	},
  grade: {
    type: String
  }

});

var Graduations = module.exports = mongoose.model('Graduations', GraduationSchema,'graduations');


//profiles will be saving to profiles collection
// module.exports.findOneAndUpdate = function(query,newProfile, callback){
// 	        newProfile.save(callback);
// };
