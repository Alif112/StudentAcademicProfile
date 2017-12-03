// var pdf = require('pdfkit');
// var fs = require('fs');
//
// var myDoc = new pdf();
//
// myDoc.pipe(fs.createWriteStream('node.pdf'));
//
// myDoc.font('Times-Roman')
// .fontSize(30)
// .text('CV',100,100);
//
// myDoc.end();

var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('index.html', 'utf8');
var options = {
  format: 'Letter'
};


exports.generatepdf = function(req, res) {

  pdf.create(html, options).toFile('./12345.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
};
