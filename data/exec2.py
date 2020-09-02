#-*-coding:utf-8-*-
import time, sys, base64;start = time.time()
result = '한글'
print(base64.b64encode('가나다'.encode('utf-8')))
print('한글')
print(time.time() - start)