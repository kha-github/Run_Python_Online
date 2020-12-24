# RunPythonOnline

### 파이썬3 코드 컴파일 웹사이트

<br>

#### 프로젝트 설치 및 실행 방법

1. 소스코드 zip파일 다운로드 및 압축 풀기
2. CMD창에서 압축 해제한 프로젝트 디렉토리로 이동
3. CMD창에서 'npm install' 명령어 입력
4. CMD창에서 'npm run start' 명령어 입력
5. 웹브라우져에서 'http://localhost:3000' 으로 이동



<br>

- 실행 영상

<p align="center"><img src="https://user-images.githubusercontent.com/55964775/91982025-9e812e00-ed64-11ea-973b-345ebeace125.gif" width="700px"><p>
<br>

<p align="center"><img src="https://user-images.githubusercontent.com/55964775/91982488-44cd3380-ed65-11ea-9092-82ad17e419b6.gif" width="700px"><p>
<br>

- 에러가 있을 때
<p align="center"><img src="https://user-images.githubusercontent.com/55964775/91987297-d9856080-ed68-11ea-9ac4-685172bcfbe7.gif" width="700px"><p>
<br>

- 한글 출력

<p align="center"><img src="https://user-images.githubusercontent.com/55964775/91987304-da1df700-ed68-11ea-8ad8-96fbf6a68be4.gif" width="700px"><p>
<br>

<br>

### 프로젝트 동기 및 목표
<p> Node.js와 Python 간의 데이터를 주고받는 방법을 학습하고 이를 적용하여, 웹에서 파이썬 코드를 입력 받아 실행 결과를 출력하는 프로그램을 만든다. </p>

<br>

### 구현 내용
<p> 서버 프로그래밍 언어로는 Node.js와 Express.js 프레임 워크를 사용하였으며 클라이언트 프로그래밍 언어로는 html, css, javascript 그리고 bootstrap4를 활용하였다. Node.js에서 Python 파일을 실행시키기 위하여 'python-shell' npm을 사용하였으며 'file-system' npm을 활용하여 파일을 읽고 쓸 수 있게하였다. <br>
 프로그램 동작 방식은 다음과 같다. 먼저 실행할 코드를 입력 받은 뒤 POST 방식으로 서버에 데이터를 전송한다. 그 다음 전송 받은 코드에 실행 시간 측정과 출력 결과를 파일로 만드는 코드를 덧붙인다. 완성된 코드를 'exec.py' 파일로 만들고 프로그램이 실행되고 있는 디렉토리에 저장한다. 그 다음 python-shell을 이용하여 저장된 파이썬 파일을 실행시키다. 파이썬 파일이 실행될 때 출력 결과를 파일로 만드는 코드에 의해서 결과물이 'output.out'파일에 저장된다. Node.js에서는 이 파일을 읽어서 웹에 출력시킨다. <br>
 파이썬 코드 실행 결과를 python-shell run함수의 데이터로 바로 가져오지 않고 파일로 저장한 뒤 해당 파일을 읽어오는 방식을 사용하였는데 그 이유는 한글의 인코딩 때문이다. run함수로 전달 받은 데이터는 utf-8 인코딩이 되지 않아서 출력 결과물에 한글이 있는 경우 깨지게 된다. 따라서 코드 실행 결과를 utf-8으로 인코딩하여 파일로 저장한 뒤, 해당 파일의 데이터를 가져오도록 하였다.
</p>

<br>

### 프로젝트를 진행하며 느낀점
 이 프로젝트를 통해 Node.js와 파이썬 간의 데이터를 주고받는 방법을 잘 알게되었다. 이는 파이썬의 웹크롤링, 데이터 분석 라이브러리를 활용한 프로그램을 웹에 적용할 수 있을 것으로 기대된다. 또한 프로젝트를 진행하면서 한글 출력이 깨지는 현상을 고치는데 많은 시간을 소요하였는데 이를 통해 인코딩 방식인 utf-8에 대해 더 공부하는 계기가 되었다. 최종적으로 파이썬 출력 결과를 파일로 만드는 함수인 sys.stdout=open에서 encoding='utf8'을 써서 파일을 인코딩하고 이 파일을 node.js에서 읽는 방식을 통해 한글 깨짐 현상을 해결 할 수 있었는데, 과정은 힘들었지만 결과물이 매우 만족스러웠다.

<br>

### 아쉬운 점 및 개선할 사항
1. Ajax를 이용하여 웹페이지를 새로 불러오지 않고 데이터를 주고받으면 좋을 것 같다. 코드를 입력했을 때 해당 페이지를 벗어나지 않고 실행 결과를 출력하면 더 멋진 프로그램으로 거듭날 수 있을 것이다.
2. 파이썬의 Input() 함수를 이용 못하는 점이 아쉽다. 파이썬 코드가 실행 될 때, 콘솔 창에 데이터를 입력 할 수 없기 때문에 프로그램 실행 후 입력 창에 Input 함수를 넣으면 EOF 오류가 결과로 나타난다. Node.js에서 python-shell option value로 파이썬 프로그램에 인자를 전달 할 수는 있지만 파이썬 코드에서 Input이 아닌 sys.argv로 인자를 전달 받을 수 있기 때문에 Input 오류의 해결책은 되지 못했다. 대안으로 python-shell의 send함수를 통해 데이터를 전달하는 방법을 사용하였으나 한글의 경우 인코딩 문제로 전달이 불가능하였다. 
3. C++, Java 등 다른 프로그래밍 언어도 컴파일 할 수 있으면 좋겠다. 'child-process' npm을 이용하여 파이썬 뿐만 아니라 다른 프로그래밍 언어 간의 데이터를 주고 받는 방식을 연구해봐야겠다.