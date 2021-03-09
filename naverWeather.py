# .py
# import json
# import sys
#
# result = sys.argv[1]
# print(result)

#-*- encoding: utf-8 -*-
from bs4 import BeautifulSoup
import time, sys, base64;start = time.time()
from pprint import pprint
import requests
import sys
import json

result = sys.argv[1]

output = ""

html = requests.get("https://search.naver.com/search.naver?query="+result+"+날씨")

soup = BeautifulSoup(html.text, 'html.parser')

data1 = soup.find('div', {'class': 'weather_box'})

find_address = data1.find('span', {'class':'btn_select'}).text
output += '현재 위치: '+find_address

find_currenttemp = data1.find('span',{'class': 'todaytemp'}).text
output += '현재 온도: '+find_currenttemp+'℃'

find_mintemp = data1.find('span',{'class': 'min'}).text
output += '최저 온도: '+find_mintemp+'℃'

find_maxtemp = data1.find('span',{'class': 'max'}).text
output += '최고 온도: '+find_maxtemp+'℃'

data2 = data1.findAll('dd')
find_dust = data2[0].find('span', {'class':'num'}).text
find_ultra_dust = data2[1].find('span', {'class':'num'}).text
find_ozone = data2[2].find('span', {'class':'num'}).text
output += '현재 미세먼지: '+find_dust
output += '현재 초미세먼지: '+find_ultra_dust
output += '현재 오존지수: '+find_ozone

#print(output)
print(base64.b64encode(output.encode('utf-8')))