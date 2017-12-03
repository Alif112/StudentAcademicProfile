
var Profile = require('../models/profilemodel');


exports.dataUpload = function(req, res) {
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
  if (req.file)
    photo = req.session.photo;
  else photo = 'dist/img/avatar.jpg';


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
    }
    req.flash('success_msg', 'You are register and can now login');
    //sleep(300, function() {});

    res.redirect('/profile/data');
    console.log(doc);
  });
};
