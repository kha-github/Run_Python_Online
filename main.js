var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs')
var bodyParser = require('body-parser');
var compression = require('compression');
var {PythonShell} = require('python-shell');
var fs = require('fs');
var utf8 = require('utf8');
var iconv = require('iconv-lite');
const template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');

var helmet = require('helmet');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

app.get('/', (request, response) => {
  var index = template.index();
  response.send(index);
  });

app.post('/create_process2', (request, response, next)=>{
    var post = request.body;
    var content = `import time, sys, base64;start = time.time();sys.stdout=open('output.out', 'w', encoding='utf8')

  ` + post.description + `
print()
print('Run time: ', time.time() - start)
sys.stdout.close()
`;
  
    fs.writeFile(`./exec.py`, content, function(err){
      console.log('success');
      var options = {
        mode: 'text',
        pythonPath: '', 
        pythonOptions: ['-u'],
        scriptPath: 'C:/Users/booro/Desktop/pyCompiler',
        args: [ 'value1', 'value2', 'value3'],
      };
  
      PythonShell.run('/exec.py', options, function (err, results) {
        if (err) {
          var html = template.html(`코드에서 오류가 발생되었습니다.`, err.message, post.description);
  
          response.send(html);
        } else{
          fs.readFile('./output.out', 'utf8', function(err, data){
            console.log(data);
            var sanitizedData = sanitizeHtml(data);
            console.log('=======sanitize======');
            console.log(sanitizedData)
            var html = template.html('실행 결과', sanitizedData , post.description)
            response.send(html);
          });
        }
      });
    });
});

app.post('/create_process3', (request, response, next)=>{
  var post = request.body;
  var content = `import time, sys, base64;start = time.time();sys.stdout=open('output.out', 'w', encoding='utf8')

` + post.description + `
print()
print('Run time: ', time.time() - start)
sys.stdout.close()
`;

  fs.writeFile(`./exec.py`, content, function(err){
    console.log('success');
    var options = {
      mode: 'json',
      pythonPath: '', 
      pythonOptions: ['-u'],
      scriptPath: 'C:/Users/booro/Desktop/pyCompiler',
      args: [ 'value1', 'value2', 'value3'],
      encoding:'utf8'
    };

    var pyshell = new PythonShell('exec.py', options);
    pyshell.send('hi');
    pyshell.on('message', function (message) {
      console.log('after pyshell.on');
      var json = JSON.stringify(message);
      console.log('after json var');
      var fs = require('fs');
      console.log('before writing file');
      fs.writeFile('myjsonfile.json', json, 'utf8', function () {
        response.send('success');
    });
    });

    // pyshell.end(function (err,code,signal) {
    //   if (err) throw err;
    //   console.log('The exit code was: ' + code);
    //   console.log('The exit signal was: ' + signal);
    //   console.log('finished');
    //   response.send('success');
    // });

  });
});

app.use(function (req, res, next){
    res.status(404).send("Wrong access!")
})

app.use(function (err, req, res, next){
    console.error(err,stack)
    res.status(500).send('Someting broke!')
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))