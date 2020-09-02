module.exports = {
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
            <div class = "container">
                <div class="row">
                    <pre>${code}</pre>
                </div>
            </div>
            </body>
        </html>
    `;
    },
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
          <a href="/"><button class="btn btn-outline-warning my-2 my-sm-0">Home</button></a>
          </nav>
          <body>
          <div class="jumbotron">
              <p>코드를 입력하세요</p>
          </div>
          <div class = "container">
          <form action = "/create_process2" method="post">
            
          <div id="description">
              <textarea placeholder="# Enter your code" name="description" rows="20" cols="80" style="border:none"></textarea><br>
              <button type = "submit" class="btn btn-primary my-2 my-sm-0">Submit</button>
          </div>
          </form>
          </div>
      </body>
      </html>
  `;
  }
}