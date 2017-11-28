
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Graduations = require('../models/graduation');

//alif alamin

function calculate(result) {
  var cgpa = 0.0;
  var credit = 0.0;
  var total = 0.0;
  for (i = 0; i < result.length; i++) {
    if (parseFloat(result[i].gradepoint) > 0.0) {
      var coursecredit = parseFloat(result[i].coursecredit);
      var gradepoint = parseFloat(result[i].gradepoint);

      console.log('-------coursecredit----->' + coursecredit);
      console.log('-------coursecredit----->' + gradepoint);

      credit = credit + coursecredit;
      total = total + gradepoint * coursecredit;
      console.log(credit);
      console.log(total);
    }
  }
  if (credit > 0)
    cgpa = total / credit;
  return cgpa;

}


router.get('/graduationsdata', function(req, res) {
  var username = req.user.username;
  console.log('--------------------->>>>  insideGraduationdata');

  Graduations.find({
    username: username
  }, function(err, results) {
    if (err) return console.error(err);
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    //console.log(parse1[0].coursetitle+'----------------------------this is the coursetitle ');

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/graduationsdata');
    var allresult = results;
    console.log(allresult);


    var result1 = [];
    var result2 = [];
    var result3 = [];
    var result4 = [];
    var result5 = [];
    var result6 = [];
    var result7 = [];
    var result8 = [];


    for (var i = 0; i < results.length; i++) {
      var myObj = {
        "_id": results[i]._id,
        "coursecode": results[i].coursecode, //your artist variable
        "coursetitle": results[i].coursetitle,
        "semester": results[i].semester,
        "coursecredit": results[i].coursecredit,
        "gradepoint": results[i].gradepoint,
        "grade": results[i].grade, //your title variable
      };

      if (results[i].semester == '1/1') {
        result1.push(myObj);
      } else if (results[i].semester == '1/2') {
        result2.push(myObj);
      } else if (results[i].semester == '2/1') {
        result3.push(myObj);
      } else if (results[i].semester == '2/2') {
        result4.push(myObj);
      } else if (results[i].semester == '3/1') {
        result5.push(myObj);
      } else if (results[i].semester == '3/2') {
        result6.push(myObj);
      } else if (results[i].semester == '4/1') {
        result7.push(myObj);
      } else if (results[i].semester == '4/2') {
        result8.push(myObj);
      }
    }
    console.log(result1);
    console.log(result2);
    console.log(result3);
    console.log(result4);
    console.log(result5);
    console.log(result6);
    console.log(result7);
    console.log(result8);

    var cgpa = calculate(results);
    var cgpa1 = calculate(result1);
    var cgpa2 = calculate(result2);
    var cgpa3 = calculate(result3);
    var cgpa4 = calculate(result4);
    var cgpa5 = calculate(result5);
    var cgpa6 = calculate(result6);
    var cgpa7 = calculate(result7);
    var cgpa8 = calculate(result8);
    console.log('------->>' + cgpa);
    console.log('------->>' + cgpa1);
    console.log('------->>' + cgpa2);
    console.log('------->>' + cgpa3);
    console.log('------->>' + cgpa4);
    console.log('------->>' + cgpa5);
    console.log('------->>' + cgpa6);
    console.log('------->>' + cgpa7);
    console.log('------->>' + cgpa8);




    console.log('full name--its here>' + fullname);
    res.render('graduationsdata', {
      fullname: fullname,
      cgpa: cgpa,
      cgpa1: cgpa1,
      cgpa2: cgpa2,
      cgpa3: cgpa3,
      cgpa4: cgpa4,
      cgpa5: cgpa5,
      cgpa6: cgpa6,
      cgpa7: cgpa7,
      cgpa8: cgpa8,
      results,
      result1,
      result2,
      result3,
      result4,
      result5,
      result6,
      result7,
      result8
    });
    console.log('ok huh');
  });


});

router.get('/graduationsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  console.log('--------------------->>>>  inside gradutionsdataedit');


  res.render('graduationsdataedit', {
    fullname: fullname
  });
});

//

router.post('/graduationsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var coursecode = req.body.coursecode;
  var coursetitle = req.body.coursetitle;
  var semester = req.body.semester;
  var coursecredit = req.body.coursecredit;
  var grade = req.body.grade;

  console.log('---------------Resuslts---------------');
  console.log('---------------' + coursecode + '---------------');
  console.log('---------------' + coursetitle + '---------------');
  console.log('---------------' + coursecredit + '---------------');
  console.log('---------------' + semester + '---------------');
  console.log('---------------' + grade + '---------------');
  var gradepoint = null;
  if (grade == 'A+') gradepoint = '4.00';
  else if (grade == 'A') gradepoint = '3.75';
  else if (grade == 'A-') gradepoint = '3.50';
  else if (grade == 'B+') gradepoint = '3.25';
  else if (grade == 'B') gradepoint = '3.00';
  else if (grade == 'B-') gradepoint = '2.75';
  else if (grade == 'C+') gradepoint = '2.50';
  else if (grade == 'C') gradepoint = '2.25';
  else if (grade == 'C-') gradepoint = '2.00';
  else if (grade == 'F') gradepoint = '0.00';
  console.log('---------------' + gradepoint + '---------------');

  var query = {
    'username': username,
    'coursecode': coursecode
  };

  Graduations.findOneAndUpdate(query, {
    $set: {

      username: username,
      coursecode: coursecode,
      coursetitle: coursetitle,
      semester: semester,
      coursecredit: coursecredit,
      gradepoint: gradepoint,
      grade: grade

    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

  });
  res.redirect('/graduations/graduationsdata');


});

//
router.get('/data/edit/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Graduations.find({
    username: username,
    _id: id
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/projectsdataupdate');

    console.log('full name--its here>' + fullname);
    res.render('graduationsdataupdate', {
      fullname: fullname,
      results
    });
    console.log('ok huh');
  });




});
//
router.get('/data/delete/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Graduations.remove({
    username: username,
    _id: id
  }, function(err) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    res.redirect('/graduations/graduationsdata');
    console.log('ok huh');
  });




});

module.exports = router;
