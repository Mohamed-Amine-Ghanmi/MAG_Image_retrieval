var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
/* GET home page. */
router.get('/', function(req, res, next) {
	
  res.render('index', 
  	{ 
  		title: 'My app',
  		age : 24 
  	});
});

/*var options = {
  mode: 'text',
  pythonOptions: ['-u'],
  args: ['--dataset' ,'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/dataset',
   '--my_query','C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/queries/127502.png',
    '--result' ,'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/result'] 
};
//PythonShell.defaultOptions = { scriptPath: '\\public\\python' };
/*PythonShell.run('search.py', function (err,result) {
  if (err) throw err;
  console.log('finished');
});*/

/*PythonShell.run('../public/python/search.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution 
  console.log('results: %j', results);
});*/

module.exports = router;
