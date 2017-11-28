var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var url = require('url');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var PDFDocument = require('pdfkit');
var fs = require('fs');
var PdfTable = require('voilab-pdf-table');

// var xoauth2 = require('xoauth2');
// var nodemailersmtptransport=require('nodemailer-smtp-transport');
//var sleep=require('sleep');

mongoose.connect('mongodb://localhost/NodeDemo');
var db = mongoose.connection;



var User = require('../models/user');
var Profile = require('../models/profilemodel');
var Award = require('../models/award');
var Graduation = require('../models/graduation');
var Hobby = require('../models/hobby');
var Interest = require('../models/interest');
var Project = require('../models/project');
var Publication = require('../models/publication');
var SSCResult = require('../models/sschscresult');

// var Profiles=[];
// var Awards=[];
// var Garduations=[];
// var Projects=[];
// var Publications=[];
// var SSCResults=[];


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


/* GET users listing. */
router.get('/', function(req, res, next) {
  var fullname = req.user.firstname + ' ' + req.user.lastname;




  res.render('generatecv', {
    fullname: fullname
  });
});



router.post('/', function(req, res, next) {
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var filepath = req.body.filepath;
  var path = filepath + '';
  var l = path.length;
  if (path[l - 1] != '/') path = filepath + '/';


  var query1 = {
    username: req.user.username
  };
  console.log('inside post generatecvs');
  Profile.find(query1, function(err1, profile) {
    if (err1) throw err1;
    else {

      Award.find(query1, function(err2, award) {
        if (err2) throw err2;
        else {
          Graduation.find(query1, function(err3, graduation) {
            if (err3) throw err3;
            else {
              SSCResult.find(query1, function(err4, sschscresult) {
                if (err4) throw err4;
                else {
                  Project.find(query1, function(err5, project) {
                    if (err5) throw err5;
                    else {
                      Publication.find(query1, function(err6, publication) {
                        if (err6) throw err6;
                        else {
                          Interest.find(query1, function(err7, interest) {
                            if (err7) throw err7;
                            else {
                              Hobby.find(query1, function(err8, hobby) {
                                if (err8) throw err8;
                                else {
                                  var cgpa = calculate(graduation);
                                  console.log('your cgpa-------->' + cgpa);

                                  console.log(sschscresult);
                                  console.log(hobby);
                                  console.log(interest);
                                  console.log(publication);
                                  console.log(project);
                                  console.log(award);


                                  var nameheader = 18;
                                  var localheader = 11;
                                  var localdata = 9;
                                  var i = 0;
                                  var doc = new PDFDocument();

                                  doc.pipe(fs.createWriteStream(path + '' + fullname + '.pdf'));
                                  if (profile.length > 0) {
                                    var l = fullname.length;
                                    doc.fontSize(nameheader);
                                    doc.font('Times-Roman')
                                      .text('' + profile[0].profilename, {
                                        align: 'center'

                                      });

                                    doc.fontSize(localdata);

                                    doc.font('Times-Roman')
                                      .text('     Address: ' + profile[0].temporaryaddress + '    Email: ' + profile[0].email + '    Contact No: ' + profile[0].phonenumber, {
                                        align: 'center',


                                      });



                                    doc.moveDown(2);
                                    doc.fontSize(localheader);
                                    doc.font('Times-Roman')
                                      .text('Personal Profile', {
                                        align: 'left',
                                        bold: true
                                      });

                                    var overview = profile[0].overview;
                                    doc.fontSize(localdata);
                                    doc.font('Times-Roman')
                                      .text('' + overview, {
                                        align: 'left'

                                      });



                                  }
                                  if (sschscresult.length > 0) {
                                    doc.moveDown(1);
                                    doc.fontSize(localheader);
                                    doc.font('Times-Roman')
                                      .text('Education', {
                                        align: 'left',
                                        bold: true
                                      });

                                    doc.fontSize(localdata);



                                    for (i = 0; i < sschscresult.length; i++) {
                                      if (sschscresult[i].examtype == 'SSC') {

                                        doc.font('Times-Roman').text('SSC    -' + sschscresult[i].institution + '    -' +
                                          sschscresult[i].passedyear + '    GPA:-' + sschscresult[i].gpa, {
                                            align: 'center',
                                          });
                                      } else if (sschscresult[i].examtype == 'HSC') {
                                        doc.font('Times-Roman').text('HSC    -' + sschscresult[i].institution + '    -' +
                                          sschscresult[i].passedyear + '    GPA:-' + sschscresult[i].gpa, {
                                            align: 'center',
                                          });
                                      } else if (sschscresult[i].examtype == 'Graduation') {
                                        doc.font('Times-Roman').text('Graduation    -' + sschscresult[i].institution + '    -' +
                                          sschscresult[i].passedyear + '    CGPA:-' + sschscresult[i].gpa, {
                                            align: 'center',
                                          });
                                      }
                                    }
                                  }






                                  // projects is here ---------------->>>

                                  if (project.length > 0) {
                                    doc.moveDown(1);
                                    doc.fontSize(localheader);
                                    doc.font('Times-Roman')
                                      .text('Projects', {
                                        align: 'left',
                                        bold: true
                                      });

                                    doc.fontSize(localdata);
                                    // doc.font('Times-Roman').text('        Project Title    ', {
                                    //   align: 'left',
                                    //   continued:true
                                    // });
                                    // doc.moveDown(1);
                                    // doc.font('Times-Roman').text('        Project Title    ', {
                                    //   align: 'right'
                                    // });
                                    doc.moveDown(1);

                                    for (i = 0; i < project.length; i++) {
                                      doc.font('Times-Roman').text('' + project[i].projecttitle, {
                                        align: 'left',
                                        continued: true
                                      });
                                      doc.moveDown(1);
                                      doc.font('Times-Roman').text('        -' + project[i].projectdetails, {
                                        align: 'right'
                                      });
                                      doc.moveDown(1);
                                    }

                                  }

                                  if (publication.length > 0) {
                                    doc.moveDown(1);
                                    doc.fontSize(localheader);
                                    doc.font('Times-Roman')
                                      .text('Publications', {
                                        align: 'left',
                                        bold: true
                                      });

                                    doc.fontSize(localdata);

                                    doc.moveDown(1);

                                    for (i = 0; i < publication.length; i++) {
                                      doc.fontSize(localheader);
                                      doc.font('Times-Roman').text('' + publication[i].publicationtitle, {
                                        align: 'left',
                                        continued: true
                                      });
                                      doc.moveDown(1);
                                      doc.fontSize(localdata);
                                      doc.font('Times-Roman').text(publication[i].publicationplace + '--' + publication[i].publicationshort + '--' + publication[i].publicationurl, {
                                        align: 'right'
                                      });
                                      doc.moveDown(1);
                                    }
                                  }


                                  if (award.length > 0) {
                                    doc.moveDown(1);
                                    doc.fontSize(localheader);
                                    doc.font('Times-Roman')
                                      .text('Awards', {
                                        align: 'left',
                                        bold: true
                                      });

                                    doc.fontSize(localdata);

                                    doc.moveDown(1);

                                    for (i = 0; i < award.length; i++) {
                                      doc.fontSize(localdata);
                                      doc.font('Times-Roman').text('' + award[i].awardtitle, {
                                        align: 'left',
                                        continued: true
                                      });
                                      doc.moveDown(1);
                                      doc.fontSize(localdata);
                                      doc.font('Times-Roman').text('--' + award[i].awarddetails, {
                                        align: 'right'
                                      });
                                      doc.moveDown(1);
                                    }


                                  }


                                  if (interest.length > 0) {
                                    doc.moveDown(1);
                                    doc.fontSize(localheader);
                                    doc.font('Times-Roman')
                                      .text('Interests', {
                                        align: 'left',
                                        bold: true
                                      });

                                    doc.fontSize(localdata);

                                    doc.moveDown(1);

                                    for (i = 0; i < interest.length; i++) {
                                      doc.fontSize(localheader);
                                      doc.font('Times-Roman').text('' + interest[i].interestabout, {
                                        align: 'left',
                                        continued: true
                                      });
                                      doc.moveDown(1);
                                      doc.fontSize(localdata);
                                      doc.font('Times-Roman').text('--' + interest[i].interestshortails + '--' + interest[i].interestnurl, {
                                        align: 'right'
                                      });
                                      doc.moveDown(1);
                                    }


                                  }



                                  doc.end();



                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }

          });

        }

      });

    }
  });




  console.log('before pipe');




  console.log('----------->   pdf created');
  req.flash('success_msg','Your CV is created on '+path);
  res.redirect('/generatecvs');

});



module.exports = router;
