import time, sys, base64;start = time.time();sys.stdout=open('output.out', 'w', encoding='utf8')

i = 0
while i < 10:
	print(i)
	i += 1
print()
print('Running time: ',end='')
print(time.time() - start)
