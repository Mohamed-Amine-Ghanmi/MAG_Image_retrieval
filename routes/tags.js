var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
/* GET home page. */
router.get('/:tag?/:tagsss', function(req, res, next) {
  

/*var img = req.param.image;
var indice = '';

if(img == 'image1\r\n'){ }
else if (img === "image2") {indice = 'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/queries/image2.png';}
else if (img === "image3") {indice = 'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/queries/image3.png';}
else if (img == "image4") {indice = 'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/queries/image4.png';}
else if (img === "image5") {indice = 'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/queries/image5.png';}
*/
var tag = req.param('tag');
var tagsss = req.param('tagsss');
//console.log(tagsss.substr(1,tagsss.length));




var options = {
  mode: 'text',
  pythonOptions: ['-u'],
  args: ['--dataset' ,'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/dataset',
         '--result' ,'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/result',
         '--tags' , tag.substr(1,tag.length)] 
};

//PythonShell.defaultOptions = { scriptPath: '\\public\\python' };
/*PythonShell.run('search.py', function (err,result) {
  if (err) throw err;
  console.log('finished');
});*/

PythonShell.run('../public/python/tags.py', options, function (err, results) { 
  if (err) throw err;
  // results is an array consisting of messages collected during execution 
  //console.log('results: %j', results);
});
    



//for (var i = 0; i < 5999999999; i++) {}
res.redirect('/')

});


module.exports = router;
