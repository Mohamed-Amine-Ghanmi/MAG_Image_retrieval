var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var fs = require('fs');
/* GET home page. */
router.get('/:indice', function(req, res, next) {
  

var dataa = req.app.locals.dataa
lines =  dataa.split('\n');
/*console.log(req.app.locals.dataa);
console.log('11111111111');*/

var indice = req.param('indice');
/*console.log(indice);
console.log('222222222');*/
//indice.substr(1,2)

var options = { 
  mode: 'text',
  pythonOptions: ['-u'],
  args: ['--dataset' ,'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/dataset',
   '--my_query',parseInt(lines[(indice)]).toString(),
   '--l0',parseInt(lines[0]).toString(),
   '--l1',parseInt(lines[1]).toString(),
   '--l2',parseInt(lines[2]).toString(),
   '--l3',parseInt(lines[3]).toString(),
   '--l4',parseInt(lines[4]).toString(),
   '--l5',parseInt(lines[5]).toString(),
   '--indice',parseInt(indice).toString(),
   '--descript','1',
    '--result' ,'C:/Users/MAG/Documents/MEGA/projet/riadh_lundi/tutorial/image retrieve/web/public/python/result'] 
};



PythonShell.run('../public/python/search.py', options, function (err, results) { 
  if (err) throw err;
  // results is an array consisting of messages collected during execution 
  //console.log('results: %j', results);
});
    

function loadFile(path,onSuccess,onError){
  fs.exists(path,function(exists){  
    if(!exists){
      onError(path);
    } else {
      fs.readFile(path, "utf8", function(err, data){
        if(err){
          onError(path);
        }else{
          onSuccess(path,data);
        }
      });
    }
  });
};


loadFile('./public/python/result/result.txt',
  // onSuccess
  function(path,data){
  //console.log('file :['+path+ '],content:['+data+']');
  lines =  data.split('\n');
req.app.locals.im1 = "python/dataset/im"+parseInt(lines[1])+".jpg";
req.app.locals.im2 = "python/dataset/im"+parseInt(lines[2])+".jpg";
req.app.locals.im3 = "python/dataset/im"+parseInt(lines[3])+".jpg";
req.app.locals.im4 = "python/dataset/im"+parseInt(lines[4])+".jpg";
req.app.locals.im5 = "python/dataset/im"+parseInt(lines[5])+".jpg";
req.app.locals.im6 = "python/dataset/im"+parseInt(lines[6])+".jpg";
req.app.locals.im7 = "python/dataset/im"+parseInt(lines[7])+".jpg";
req.app.locals.im8 = "python/dataset/im"+parseInt(lines[8])+".jpg";
req.app.locals.im9 = "python/dataset/im"+parseInt(lines[9])+".jpg";
req.app.locals.im10 = "python/dataset/im"+parseInt(lines[10])+".jpg";
req.app.locals.im11 = "python/dataset/im"+parseInt(lines[11])+".jpg";
req.app.locals.im12 = "python/dataset/im"+parseInt(lines[12])+".jpg";
req.app.locals.im13 = "python/dataset/im"+parseInt(lines[13])+".jpg";
req.app.locals.dataa = data;
  },
  //onError
  function(path){
    console.log('Unable to load file :['+path+ ']');
  });





//for (var i = 0; i < 5999999999; i++) {}
res.redirect('/')

});


module.exports = router;

