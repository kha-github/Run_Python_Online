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


// app.get('*', function(request, response, next){
//    next();
// })

//app.use('/', indexRouter);

app.get('/', (request, response) => {
    var html = `     
      <!DOCTYPE html>
      <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="/css/style2.css">
              <title>create</title>
          </head>
  
          <body>
              <form action = "/create_process2" method="post">
              
              <div id="description">
                  <textarea placeholder="내용" name="description"></textarea>
                  <input type = "submit">
              </div>
              </form>
          </body>
      </html>
  `;
  var index = template.index();
  response.send(index);
  });

app.post('/create_process2', (request, response, next)=>{
    var post = request.body;
    var content = `import time, sys, base64;start = time.time();sys.stdout=open('output.txt', 'w');` + post.description + `
print()
print('Run time: ', time.time() - start)`;
  
  
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
          fs.readFile('./output.txt', 'utf8', function(err, data){
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

app.get('/file', (request, response, next)=>{
    var fs = require('fs');
    fs.readFile('file.txt', 'utf8', function(err,data){
    console.log(data);
    response.send(data);
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