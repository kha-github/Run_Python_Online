import base64
import sys

result = sys.argv[1]
result = str(result)
print(base64.b64encode(result.encode('utf-8')))