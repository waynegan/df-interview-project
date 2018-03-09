var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var users = express.Router();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

var multer  = require('multer');

var uploadService = multer({ storage: multer.memoryStorage() });

app.post("/upload", uploadService.single('file'), function (req, res) {
  if(req.file){
    var log = 'No problem';
    var uploadedFile = req.file;
    console.log();
   var tempArr = uploadedFile.buffer.toString('utf8').split("\n")
    tempArr.shift();
    console.log(tempArr);
    for (var value of tempArr) {

      var arr = value.split(' ');
      
      arr = arr.filter(t => t);
      
      if(arr[4] != undefined)
      arr[4] = arr[4].replace('%','');
      console.log(arr[4]);
     
      if(arr[3]/104857 < 3 || arr[4] > 75 )
      {
        log = 'Warning, at least one of field abnormal'
      }
    }
    
// console.log(uploadedFile.contents.toString());
    res.status(200).send(log);
  }
  else
  {
    res.status(500).send('System Error');
  }
  
});


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  next();
});

app.get('/', function (req, res) {
  res.sendFile( __dirname +'/webApp/index.html');
})
app.use('/webApp', express.static(__dirname + '/webApp'));
app.post('/dfContent', function (req, res) {
    console.log(req.body);
});

var http = require('http').Server(app);
http.listen(8098, function () {
  console.log(new Date(new Date() - new Date().getTimezoneOffset() * 60 * 1000).toISOString());
});