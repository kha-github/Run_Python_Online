var express = require('express');
var router = express.Router();
var auth = require('../lib/auth.js');
var {PythonShell} = require('python-shell');
var fs = require('fs');
var utf8 = require('utf8');
var iconv = require('iconv-lite');

router.get('/', function(request, response){
  // PythonShell.runString('x=1+1;print(x)', null, function (err) {
  //   if (err) throw err;
  //   console.log('finished');
  //   response.send('success');
  // });
  
// path to anaconda: C:/ProgramData/Anaconda3/python.exe
  var options = {
    mode: 'text',
    pythonPath: '', 
    pythonOptions: ['-u'],
    scriptPath: 'C:/Users/booro/Desktop/bin',
    args: [ '한글', 'value2', 'value3']
  };

  PythonShell.run('/test.py', options, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);
    response.send('success');
  });
});

router.get('/create', (request, response) => {
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
            <form action = "/create_process" method="post">
            
            <div id="description">
                <textarea placeholder="내용" name="description"></textarea>
                <input type = "submit">
            </div>
            </form>
        </body>
    </html>
`;
response.send(html);
});

router.post('/create_process', (request, response, next)=>{
  var post = request.body;
  var content = `#-*-coding:utf-8-*-
import time, sys, base64;start = time.time()
` + post.description + `
print(time.time() - start)`;

  fs.writeFile(`./exec.py`, content, function(err){
    console.log('success');
    var options = {
      mode: 'text',
      pythonPath: '', 
      pythonOptions: ['-u'],
      scriptPath: 'C:/Users/booro/Desktop/bin',
      args: [ '', 'value2', 'value3'],
    };

    PythonShell.run('/exec.py', options, function (err, results) {
      if (err) {
        response.send('잘못된 코드입니다');
      } else{
        // let data = results[0].replace(`b\'`, '').replace(`\'`, '');
        // let buff = Buffer.from(data, 'base64');
        // let text = buff.toString('utf-8');
        // console.log('text:', text);

        //console.log('results: %j', text);
        var data = String(results[1]);
        data = data.replace(/\('(.*?)',\s'(.*?)'\)/g, '{"value":"$1", "type":"$2"}');
        console.log('data: ' + data);
      var res = `<p>`;
      var i = 0;
      while(i < results.length){
        var text = '';
        if(isNaN(results[i])){
          let data = results[i].replace(`b\'`, '').replace(`\'`, '');
          let buff = Buffer.from(data, 'base64');
          text = buff.toString('utf-8');
          console.log('text:', text);
        }
        else{
          text = results[i];
        }
        res += text + `<br>`;
        i += 1;
      }
      res += `</p>`
      console.log(res);
      var html =`
      <!DOCTYPE html>
            <html>
            <head>
                <title>res</title>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/css/style2.css">
                <script src="https://kit.fontawesome.com/8efa19c011.js" crossorigin="anonymous"></script>
            </head>
            <body>
                <div id="description">
                    ${res}<br><br>

                    
                </div>

                
            </body>
            </html>
      `;
      response.send(html); 
      }
    });
  });
});

router.get('/create2', (request, response) => {
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
response.send(html);
});

router.post('/create_process2', (request, response, next)=>{
  var post = request.body;
  var content = `#-*-coding:utf-8-*-
import time, sys, base64;start = time.time();sys.stdout=open('whereIsIt.txt', 'w');
` + post.description + `
print(time.time() - start)`;

  fs.writeFile(`./exec.py`, content, function(err){
    console.log('success');
    var options = {
      mode: 'text',
      pythonPath: '', 
      pythonOptions: ['-u'],
      scriptPath: 'C:/Users/booro/Desktop/bin',
      args: [ '', 'value2', 'value3'],
    };
    console.log(__dirname);
    PythonShell.run('/exec.py', options, function (err, results) {
      if (err) {
        response.send('잘못된 코드입니다');
      } else{
        response.send('success');
      // var html =`
      // <!DOCTYPE html>
      //       <html>
      //       <head>
      //           <title>res</title>
      //           <meta charset="utf-8">
      //           <link rel="stylesheet" href="/css/style2.css">
      //           <script src="https://kit.fontawesome.com/8efa19c011.js" crossorigin="anonymous"></script>
      //       </head>
      //       <body>
      //           <div id="description">
      //               ${res}<br><br>

                    
      //           </div>

                
      //       </body>
      //       </html>
      // `;
      // response.send(html); 
      }
    });
  });
});

module.exports = router;