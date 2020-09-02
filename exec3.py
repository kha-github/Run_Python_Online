#-*-coding:utf-8-*-
import time, sys, base64;start = time.time();sys.stdout=open('output.txt', 'w');
input_cnt = 0
def input():
    global input_cnt
    input_cnt += 1
    return sys.argv[input_cnt]
x = input()
y = input()
print("x: ", x)
print("y: ", y)
center = []
f = open("C:/Users/booro/Desktop/pyCompiler/input.txt", 'r')
while 1:
    line = f.readline()
    if not line:
        break
    # center += list(float(i) for i in line.split())
    for j in list(i for i in line.split()):
        print(type(j).__name__)
f.close()
print(center)

print()
print('Run time: ', time.time() - start)