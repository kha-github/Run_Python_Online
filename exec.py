import time, sys, base64;start = time.time();sys.stdout=open('output.out', 'w', encoding='utf8')

x = input()
print(x)
print()
print('Run time: ', time.time() - start)
sys.stdout.close()
