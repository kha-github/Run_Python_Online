var express = require('express');
var router = express.Router();
var auth = require('../lib/auth.js');
var {PythonShell} = require('python-shell');
var fs = require('fs');
var utf8 = require('utf8');
var iconv = require('iconv-lite');
const template = require('../lib/template.js');

router.get('/', (request, response) => {
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

router.post('/create_process2', (request, response, next)=>{
  var post = request.body;
  var content = `#-*-coding:utf-8-*-
import time, sys, base64;start = time.time();sys.stdout=open('output.txt', 'w');
` + post.description + `
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
        fs.readFile('C:/Users/booro/Desktop/pyCompiler/output.txt', 'utf8', function(err, data){
          console.log(data);
          var html = template.html('실행 결과', data , post.description)
          response.send(html);
        });
      }
    });
  });
});

module.exports = router;