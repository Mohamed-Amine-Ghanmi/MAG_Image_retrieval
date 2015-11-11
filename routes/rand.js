var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {

var result;
var content = '1\n';
for (var i = 0; i <= 12; i++) {
  result = Math.round((Math.random() * (50000 - 1)) + 1);
  content = content + result.toString()+'\n';  
  };  
fs.writeFile('./public/python/result/result.txt', content, function (err) {
  if (err) throw err;
});

res.redirect('/');
});

module.exports = router;

