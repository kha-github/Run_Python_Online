module.exports = { // 코드 실행 결과 화면 템플릿
    html: function (msg, errMsg, code) {
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <title>result</title>
                <script>
                
                    function back(){
                        window.history.back();
                    }
                   
                </script>
            </head>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <button class="btn btn-outline-warning my-2 my-sm-0" onclick="back()">Back</button>
            </nav>
            <body>

            <div class="jumbotron">
                <p>${msg}</p>
                <pre class="lead">${errMsg}</pre>
            </div>
            <div class = "card">
            <div class = "card-body">
                    <pre>${code}</pre>
            </div>
            </div>
            </body>
        </html>
    `;
    },
    // 메인 화면 템플릿
    index: function () {
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <title>result</title>
            </head>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
            <a href="/"><button class="btn btn-outline-warning my-2 my-sm-0" >Home</button></a>
            </nav>
            <body>
            <div class="jumbotron">
            <h2>Kelly API Market</h2>
            </div>
            <div class = "card">
            <div class = "card-body">
            <form action = "/create_process2" method="post">
                <input class="form-control" type="text" id="param1" name="param1" placeholder="첫번째 인자">
                <input class="form-control" type="text" id="param2" name="param2" placeholder="두번째 인자">
                <textarea class="form-control" id="description" placeholder="API 구현부" name="description" rows="20" onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"></textarea><br>
                <button onclick="PadAjax()" class="btn btn-primary my-2 my-sm-0" id="ajax_test">결과 확인</button>
            </form>
            
            </div>
            </div>
            
            <script>
                function PadAjax(){
                    $.ajax({
                        url: '/create_process2',
                        dataType: 'json',
                        type: 'POST',
                        data: {'description':$('#description').val(),
                                'param1':$('#param1').val()
                                'param2':$('#param2').val()},
                        success: function(result) {
                            if (result) {
                                $('#resultBox').html(result.result);
                            }          
                        }
                    });
                }
            
            </script>
            
            <p id ='resultBox'>실행 결과</p>
            
        </body>
        </html>
      
  `;
    }
}