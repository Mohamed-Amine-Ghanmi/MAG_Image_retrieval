var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var rand = require('./routes/rand');
var image = require('./routes/image');
var EH_HT = require('./routes/checkboxes/EH_HT');
var EH = require('./routes/checkboxes/EH');
var HT = require('./routes/checkboxes/HT');
var tags = require('./routes/tags');

var app = module.exports = express();

var PythonShell = require('python-shell');

http = require("http"),
path = require("path"),
url = require("url"),
runner = require("child_process");


var fs = require('fs');
var path = require('path');
app.use(express.static(__dirname + '/public'));
//app.listen(8811); 

// PythonShell.run('public/python/search.py');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//-----------------------------------------------------------------------------------------------
/*var contenu;
contenu = fs.readFileSync("./public/python/result/result.txt", "UTF-8");
contenu.split('\n').forEach(function(line) {
   console.log(line);
   console.log('\n');
  });
fs.closeSync(contenu)*/
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
  app.locals.im1 = "python/dataset/im"+parseInt(lines[1])+".jpg";
  app.locals.im2 = "python/dataset/im"+parseInt(lines[2])+".jpg";
  app.locals.im3 = "python/dataset/im"+parseInt(lines[3])+".jpg";
  app.locals.im4 = "python/dataset/im"+parseInt(lines[4])+".jpg";
  app.locals.im5 = "python/dataset/im"+parseInt(lines[5])+".jpg";
  app.locals.im6 = "python/dataset/im"+parseInt(lines[6])+".jpg";
  app.locals.im7 = "python/dataset/im"+parseInt(lines[7])+".jpg";
  app.locals.im8 = "python/dataset/im"+parseInt(lines[8])+".jpg";
  app.locals.im9 = "python/dataset/im"+parseInt(lines[9])+".jpg";
  app.locals.im10 = "python/dataset/im"+parseInt(lines[10])+".jpg";
  app.locals.im11 = "python/dataset/im"+parseInt(lines[11])+".jpg";
  app.locals.im12 = "python/dataset/im"+parseInt(lines[12])+".jpg";
  app.locals.im13 = "python/dataset/im"+parseInt(lines[13])+".jpg";
  app.locals.dataa = data;
  },
  //onError
  function(path){
    console.log('Unable to load file :['+path+ ']');
  });


//-----------------------------------------------------------------------------------------------

app.use('/', routes); 
app.use('/users', users);

app.use('/python/image/', image);
app.use('/python/EH_HT', EH_HT);
app.use('/python/EH', EH);
app.use('/python/HT', HT);
app.use('/python/tags', tags);
app.use('/python/rand', rand);




var multer = require('multer'); 
app.post('/file-upload/:r?', multer({ dest: './public/python/queries' }).single('thumbnail'), function (req, res, next) { 
  var tmp_path = req.file.path;
  target_path = './public/python/queries/' + req.file.originalname;

   /*var r = req.param('r');
        if(r==1)
        target_path = './public/python/queries/image1.jpg';
        else if(r==2)
        target_path = './public/python/queries/image2.jpg';
        else if(r==3)
        target_path = './public/python/queries/image3.jpg';
        else if(r==4)
        target_path = './public/python/queries/image4.jpg';
        else if(r==5)
        target_path = './public/python/queries/image5.jpg';*/
  fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
           // res.render('index', {target : '/public/python/queries/image1'});
        });
        });

  //app.locals.image1 = '/python/queries/' + req.file.originalname;
  res.redirect("/");
});


app.get('/radio/:choix?/:r?', function (req, res , next) {
    //console.log(req.param('choix'));
    var x = req.param('choix');
    var r = req.param('r');
        if(x[0]==1 && x[1]==2)         
        res.redirect('/python/EH_HT/' + r +'?' );
        else if(x[0]==1)
        res.redirect('/python/EH/' + r +'?');
        else if(x[0]==2)
        res.redirect('/python/HT/' + r +'?');
        else
        res.redirect('/');
});


app.get('/tags/:tag?/:tagsss?', function (req, res , next) {
    var tag = req.param('tag');
    var tagsss = req.param('tagsss');
    res.redirect('/python/tags/:' + tag+'/:'+tagsss );
});

app.get('/rand', function (req, res , next) {
    res.redirect('/python/rand');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
