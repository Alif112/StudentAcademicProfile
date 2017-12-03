var Graduations = require('../models/graduation');
var Projects = require('../models/project');
var SSCResult = require('../models/sschscresult');
var Awards = require('../models/award');
var Publication = require('../models/publication');


exports.graduationsData = function(username, callback) {
  process.nextTick(function() {

    Graduations.find({
      username: username
    }, function(err, results) {

      if (err) throw err;

      else if (JSON.stringify(results) <= 2) {
        console.log(results);
        results = null;
      }
      //console.log(data);


      return callback(null, results);
    });
    //console.log(data);


  });
};

exports.projectsData = function(username, callback) {

  process.nextTick(function() {

    Projects.find({
      username: username
    }, function(err, results) {

      if (err) throw err;

      else if (JSON.stringify(results) <= 2) {
        //console.log(results);
        results = null;
      }
      //console.log(data);


      return callback(null, results);
    });
    //console.log(data);


  });

};

exports.SSCData = function(username, callback) {

  process.nextTick(function() {

    SSCResult.find({
      username: username
    }, function(err, results) {

      if (err) throw err;

      else if (JSON.stringify(results) <= 2) {
        //console.log(results);
        results = null;
      }
      //console.log(data);


      return callback(null, results);
    });
    //console.log(data);


  });

};

exports.awardData = function(username, callback) {

  process.nextTick(function() {

    Awards.find({
      username: username
    }, function(err, results) {

      if (err) throw err;

      else if (JSON.stringify(results) <= 2) {
        //console.log(results);
        results = null;
      }
      //console.log(data);


      return callback(null, results);
    });
    //console.log(data);


  });

};


exports.publicationData = function(username, callback) {

  process.nextTick(function() {

    Publication.find({
      username: username
    }, function(err, results) {

      if (err) throw err;

      else if (JSON.stringify(results) <= 2) {
        //console.log(results);
        results = null;
      }
      //console.log(data);


      return callback(null, results);
    });
    //console.log(data);


  });

};
