var express = require('express');
var router = express.Router();



router.get('/',function(req,res){
  res.render('pdf');
});


module.exports=router;
