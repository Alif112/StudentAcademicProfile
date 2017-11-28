var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer = require("multer");
var upload = multer({
  dest: "./uploads",
});
//var mongodb=require('mongodb');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/NodeDemo');
var conn = mongoose.connection;

var gfs;
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



var Profile = require('../models/profilemodel');
var Graduations = require('../models/graduation');

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


function sleep(time, callback) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {}
  callback();
}




router.get('/', ensureAuthenticated, function(req, res) {
  console.log('---------------------------------->>>>>>  inside profile');
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  username = req.query.username;
  var photo = '/dist/img/avatar.jpg';
  // if (req.user.photo);
  // photo = req.user.photo;

  //console.log('--------------------->>>'+fullname);
      var cgpa = 0.00;
      var completed = 0.00;
      var drop = 0.00;
      var precgpa = 0.00;
      Graduations.find({
          username: username
        }, function(err, results) {

          if (err) throw err;

          else if (results) {
             cgpa = calculate(results);
             precgpa=cgpa;
            for (i = 0; i < results.length; i++) {
              if (parseFloat(results[i].gradepoint) > 0.0) {
                completed += parseFloat(results[i].gradepoint);
                }
                else {
                  drop=+parseFloat(results[i].gradepoint);
                }

              }
            }


              cgpa=cgpa.toFixed(2);

              res.render('index', {
                fullname: fullname,cgpa:cgpa,drop:drop,completed:completed,precgpa:cgpa,photo: photo
              });




          });







      });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
    //return next();
  }

}

router.get('/data', ensureAuthenticated, function(req, res) {
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var username = req.user.username;
  var query = {
    'username': username
  };

  Profile.findOne(query, function(err, user) {
    if (err) throw err;
    var profilename;
    var university;
    var registration;
    var dept;
    var dob;
    var father;
    var mother;
    var gender;
    var maritalstatus;
    var permanentaddress;
    var temporaryaddress;
    var primaryoccupation;
    var secondaryoccupation;
    var phonenumber;
    var email;
    var language;
    var workexperience;
    var overview;
    var photo;
    if (user) {
      profilename = user.profilename;
      university = user.university;
      registration = user.registration;
      dept = user.dept;
      dob = user.dob;
      father = user.father;
      mother = user.mother;
      gender = user.gender;
      maritalstatus = user.maritalstatus;
      permanentaddress = user.permanentaddress;
      temporaryaddress = user.temporaryaddress;
      primaryoccupation = user.primaryoccupation;
      secondaryoccupation = user.secondaryoccupation;
      phonenumber = user.phonenumber;
      email = user.email;
      language = user.language;
      workexperience = user.workexperience;
      overview = user.overview;
      photo = user.photo;
    } else if (!user) {
      profilename = fullname;
      university = null;
      registration = null;
      dept = null;
      dob = null;
      father = null;
      mother = null;
      gender = null;
      maritalstatus = null;
      permanentaddress = null;
      temporaryaddress = null;
      primaryoccupation = null;
      secondaryoccupation = null;
      phonenumber = null;
      email = null;
      language = null;
      workexperience = null;
      overview = null;
      photo = 'dist/img/avatar.jpg';
    }



    console.log('---------> in data route--------------------------->>>>>');
    console.log('  ---------profilename->>> ' + profilename + '  --regi- ' + registration + '----dept- ' + dept);
    console.log('  ---------birth->>> ' + dob + ' -father-- ' + father + '--mother--- ' + mother);
    console.log('  --------gender-->>> ' + gender + ' --marital status- ' + maritalstatus + '---permanentaddress-- ' + permanentaddress);
    console.log('  -----temporaryaddress----->>> ' + temporaryaddress + '-primaryoccupation-- ' + primaryoccupation + '--secondaryoccupation--- ' + secondaryoccupation);
    console.log('  --------phonenumber-->>> ' + phonenumber + ' -email-- ' + email + '---language-- ' + language);
    console.log('  ---------workexperience->>> ' + workexperience + ' -overview-- ' + overview + '--university--- ' + university);

    res.render('profiledata', {
      fullname: fullname,
      profilename: profilename,
      university: university,
      registration: registration,
      dept: dept,
      dob: dob,
      father: father,
      mother: mother,
      gender: gender,
      maritalstatus: maritalstatus,
      permanentaddress: permanentaddress,
      temporaryaddress: temporaryaddress,
      primaryoccupation: primaryoccupation,
      secondaryoccupation: secondaryoccupation,
      phonenumber: phonenumber,
      email: email,
      language: language,
      workexperience: workexperience,
      overview: overview,
      photo: photo
    });
  });

});

router.get('/editdata', ensureAuthenticated, function(req, res) {
  var fullname = req.user.firstname + ' ' + req.user.lastname;

  console.log('inside editdata');
  Profile.findOne({
    username: req.user.username
  }, function(err, user) {
    if (err) throw err;

    var profilename;
    var university;
    var registration;
    var dept;
    var dob;
    var father;
    var mother;
    var gender;
    var maritalstatus;
    var permanentaddress;
    var temporaryaddress;
    var primaryoccupation;
    var secondaryoccupation;
    var phonenumber;
    var email;
    var language;
    var workexperience;
    var overview;
    var photo;
    if (user) {
      profilename = user.profilename;
      university = user.university;
      registration = user.registration;
      dept = user.dept;
      dob = user.dob;
      father = user.father;
      mother = user.mother;
      gender = user.gender;
      maritalstatus = user.maritalstatus;
      permanentaddress = user.permanentaddress;
      temporaryaddress = user.temporaryaddress;
      primaryoccupation = user.primaryoccupation;
      secondaryoccupation = user.secondaryoccupation;
      phonenumber = user.phonenumber;
      email = user.email;
      language = user.language;
      workexperience = user.workexperience;
      overview = user.overview;
      photo = user.photo;


    }
    if (!user) {
      profilename = fullname;
      university = null;
      registration = null;
      dept = null;
      dob = null;
      father = null;
      mother = null;
      gender = null;
      maritalstatus = null;
      permanentaddress = null;
      temporaryaddress = null;
      primaryoccupation = null;
      secondaryoccupation = null;
      phonenumber = null;
      email = null;
      language = null;
      workexperience = null;
      overview = null;
      photo = 'dist/img/avatar.jpg';
    }

    console.log('---------> in data route--------------------------->>>>>');
    console.log('  ---------profilename->>> ' + profilename + '  --regi- ' + registration + '----dept- ' + dept);
    console.log('  ---------birth->>> ' + dob + ' -father-- ' + father + '--mother--- ' + mother);
    console.log('  --------gender-->>> ' + gender + ' --marital status- ' + maritalstatus + '---permanentaddress-- ' + permanentaddress);
    console.log('  -----temporaryaddress----->>> ' + temporaryaddress + '-primaryoccupation-- ' + primaryoccupation + '--secondaryoccupation--- ' + secondaryoccupation);
    console.log('  --------phonenumber-->>> ' + phonenumber + ' -email-- ' + email + '---language-- ' + language);
    console.log('  ---------workexperience->>> ' + workexperience + ' -overview-- ' + overview + '--university--- ' + university);



    res.render('dataedit', {
      fullname: fullname,
      profilename: profilename,
      university: university,
      registration: registration,
      dept: dept,
      dob: dob,
      father: father,
      mother: mother,
      gender: gender,
      maritalstatus: maritalstatus,
      permanentaddress: permanentaddress,
      temporaryaddress: temporaryaddress,
      primaryoccupation: primaryoccupation,
      secondaryoccupation: secondaryoccupation,
      phonenumber: phonenumber,
      email: email,
      language: language,
      workexperience: workexperience,
      overview: overview,
      photo: photo
    });

    console.log('ok output---------------->');

  });



});


conn.once("open", function() {
  gfs = Grid(conn.db);
  router.post('/editdata', ensureAuthenticated, upload.single('UploadPhoto'), function(req, res) {
    var username = req.user.username;
    console.log('usename in editdata------------------' + username);
    var profilename = req.body.profilename;
    var university = req.body.university;
    var registration = req.body.registration;
    var dept = req.body.dept;
    var dob = req.body.dob;
    var father = req.body.father;
    var mother = req.body.mother;
    var gender = req.body.gender;
    var maritalstatus = req.body.maritalstatus;
    var permanentaddress = req.body.permanentaddress;
    var temporaryaddress = req.body.temporaryaddress;
    var primaryoccupation = req.body.primaryoccupation;
    var secondaryoccupation = req.body.secondaryoccupation;
    var phonenumber = req.body.phonenumber;
    var email = req.body.email;
    var language = req.body.language;
    var workexperience = req.body.workexperience;
    var overview = req.body.overview;
    var photoname = null;
    if (req.file)
      photoname = username + req.file.originalname;
    var photo = '/photos/' + photoname;


    console.log('  ---------profilename->>> ' + profilename + ' --regi- ' + registration + '----dept- ' + dept);
    console.log('  ---------birth->>> ' + dob + ' -father-- ' + father + '--mother--- ' + mother);
    console.log('  --------gender-->>> ' + gender + ' --marital status- ' + maritalstatus + '---permanentaddress-- ' + permanentaddress);
    console.log('  -----temporaryaddress----->>> ' + temporaryaddress + '-primaryoccupation-- ' + primaryoccupation + '--secondaryoccupation--- ' + secondaryoccupation);
    console.log('  --------phonenumber-->>> ' + phonenumber + ' -email-- ' + email + '---language-- ' + language);
    console.log('  ---------workexperience->>> ' + workexperience + ' -overview-- ' + overview + '--dept--- ' + dept);


    console.log('personal data ok');
    var newProfile = new Profile({
      username: username,
      profilename: profilename,
      university: university,
      registration: registration,
      dept: dept,
      dob: dob,
      father: father,
      mother: mother,
      gender: gender,
      maritalstatus: maritalstatus,
      permanentaddress: permanentaddress,
      temporaryaddress: temporaryaddress,
      primaryoccupation: secondaryoccupation,
      phonenumber: phonenumber,
      email: email,
      language: language,
      workexperience: workexperience,
      overview: overview,
      photo: photo
    });

    var query = {
      'username': username
    };
    // Profile.findOneAndUpdate(query,newProfile,function(err,profile){
    //   if (err) throw err;
    //   console.log(profile);
    //   console.log('------------>these datas are uploaded');
    // });
    Profile.findOneAndUpdate(query, {
      $set: {
        username: username,
        profilename: profilename,
        university: university,
        registration: registration,
        dept: dept,
        dob: dob,
        father: father,
        mother: mother,
        gender: gender,
        maritalstatus: maritalstatus,
        permanentaddress: permanentaddress,
        temporaryaddress: temporaryaddress,
        primaryoccupation: secondaryoccupation,
        phonenumber: phonenumber,
        email: email,
        language: language,
        workexperience: workexperience,
        overview: overview,
        photo: photo
      }
    }, {
      new: true,
      upsert: true
    }, function(err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      } else {
        console.log("Data Uploaded");
        if (req.file && req.file.originalname.length > 0) {
          var writestream = gfs.createWriteStream({
            filename: photoname
          });
          //
          // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.


          fs.createReadStream("./uploads/" + req.file.filename)
            .on("end", function() {
              fs.unlink("./uploads/" + req.file.filename, function(err) {
                if (err) throw err;
                console.log("success");
              });
            })
            .on("err", function() {
              console.log("Error uploading image");
            })
            .pipe(writestream);
        } else {
          photo = 'dist/img/avatar.jpg';
        }

      }

      console.log(doc);
    });

    req.flash('success_msg', 'You are register and can now login');
    sleep(300, function() {});

    res.redirect('/profile/data');

  });


});


module.exports = router;
