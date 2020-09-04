module.exports = {
    // 코드 실행 결과 화면 템플릿
    html:function(msg, errMsg, code){
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
    index:function(){
      return `
      <!DOCTYPE html>
      <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
              <title>result</title>
          </head>
          <nav class="navbar navbar-expand navbar-dark bg-dark">
          <a href="/"><button class="btn btn-outline-warning my-2 my-sm-0" >Home</button></a>
          </nav>
          <body>
          <div class="jumbotron">
              <h2>Online Python Compiler</h2>
          </div>
          <div class = "card">
          <div class = "card-body">
          <form action = "/create_process2" method="post">
              <textarea class="form-control" id="myCode" placeholder="# Enter your code" name="description" rows="20" onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"></textarea><br>
              <button type = "submit" class="btn btn-primary my-2 my-sm-0">Submit</button>
          </form>
          </div>
          </div>
      </body>
      </html>
  `;
  }
}