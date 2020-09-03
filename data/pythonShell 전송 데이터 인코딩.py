# base64를 이용한 인코딩 방법
# base64: 바이트코드를 64진법 ascii 코드로 인코딩하고, 다시 bytes 정보로 디코딩 하는 기법
import time, sys, base64;start = time.time()
result = '한글'
print(base64.b64encode('가나다'.encode('utf-8')))
print('한글')
print(time.time() - start)

# 출력 결과 받는 Node.js코드
# let data = results[0].replace(`b\'`, '').replace(`\'`, '');
# let buff = Buffer.from(data, 'base64');
# let text = buff.toString('utf-8');