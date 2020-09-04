import time, sys, base64;start = time.time();sys.stdout=open('output.out', 'w', encoding='utf8')

for i in range(100):
	for j in range(i):
		print('*',end='')
	print();
print()
print('Running time: ',end='')
print(time.time() - start)
