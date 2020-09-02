var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs')
var bodyParser = require('body-parser');
var compression = require('compression');
var {PythonShell} = require('python-shell');
var fs = require('fs');
const template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
var helmet = require('helmet');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

// 메인 페이지
app.get('/', (request, response) => {
  var index = template.index();
  response.send(index);
  });

// 코드 실행 결과 페이지
app.post('/create_process2', (request, response, next)=>{
    var post = request.body;  
    // content: 파이썬 코드(실행 시간 측정 코드 + 출력을 파일에 저장하는 코드 + 입력 받은 코드)
    var content = `import time, sys, base64;start = time.time();sys.stdout=open('output.out', 'w', encoding='utf8')

` + post.description + `
print()
print('Running time: ',end='')
print(time.time() - start)
`;
    // 파이썬 코드를 파일로 만듬
    fs.writeFile(`./exec.py`, content, function(err){
      console.log('success');

      // 파이썬 파일을 실행
      var options = {
        mode: 'text',
        pythonPath: '', 
        pythonOptions: ['-u'],
        scriptPath: `${__dirname}`,
        args: [ 'value1', 'value2', 'value3'], // 전달인자(sys.argv[i] 사용하면 받을 수 있음)
      };
      console.log('dirname: ' + __dirname);
      PythonShell.run('/exec.py', options, function (err, results) {
        // 코드에 에러가 있는 경우: err.message로 에러 내용 출력
        if (err) {
          var html = template.html(`코드에서 오류가 발생되었습니다.`, err.message, post.description);
          response.send(html);
        // 코드 실행이 잘 된 경우
        } else{
          // 결과를 output.out 파일로 만듬
          fs.readFile('./output.out', 'utf8', function(err, data){
            // 파일 내용 중에 태그가 있으면 없앰
            var sanitizedData = sanitizeHtml(data);
            var html = template.html('실행 결과', sanitizedData , post.description)
            response.send(html);
          });
        }
      });
    });
});

// 입력 값을 받기 위한 테스트 코드(수정 필요)
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
      scriptPath: `${__dirname}`,
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