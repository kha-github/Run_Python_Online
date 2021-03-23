var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs')
var bodyParser = require('body-parser');
var compression = require('compression');
var {
    PythonShell
} = require('python-shell');
var fs = require('fs');
const template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
var helmet = require('helmet');
app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
// 메인 페이지
app.get('/', (request, response) => {
    var index = template.index();
    response.send(index);
});
// 코드 실행 결과 페이지
app.post('/create_process2', (request, response) => {
    var post = request.body;
    // content: 파이썬 코드(실행 시간 측정 코드 + 출력을 파일에 저장하는 코드 + 입력 받은 코드)
    var content = `import time, sys, base64;start = time.time();sys.stdout=open('output.out', 'w', encoding='utf8')

` + post.description + `;
`;
    console.log(request.body);
    console.log(post.param1);
    console.log(post.param2);
    // 파이썬 코드를 파일로 만듬
    fs.writeFile(`./exec.py`, content, function (err) {
        console.log('success');
        // 파이썬 파일을 실행
        var options = {
            mode: 'text',
            pythonPath: '',
            pythonOptions: ['-u'],
            scriptPath: `${__dirname}`,
            args: [
                post.param1, post.param2
            ], // 전달인자(sys.argv[i] 사용하면 받을 수 있음)
        };
        console.log('dirname: ' + __dirname);
        PythonShell.run('/exec.py', options, function (err, results) { // 코드에 에러가 있는 경우: err.message로 에러 내용 출력
            if (err) {
                response.send({result: err.message})
                // var html = template.html(`코드에서 오류가 발생되었습니다.`, err.message, post.description);
                // console.log(err.message)
                // response.send(html);
                // 코드 실행이 잘 된 경우
            } else { // 결과를 output.out 파일로 만듬
                fs.readFile('./output.out', 'utf8', function (err, data) { // 파일 내용 중에 태그가 있으면 없앰
                    var sanitizedData = sanitizeHtml(data);
                    console.log(sanitizedData)
                    response.send({result: sanitizedData})
                    // var html = template.html('실행 결과', sanitizedData , post.description)
                    // response.send(html);
                });
            }
        });
    });
});
app
    .use(function (req, res, next) {
        res.status(404).send("Wrong access!")
    })
app
    .use(function (err, req, res, next) {
        console
            .error(err, stack)
        res
            .status(500)
            .send('Someting broke!')
    })
app
    .listen(port, () => console.log(`app listening at http://localhost:${port}`))