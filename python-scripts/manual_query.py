import requests
import json

resp = requests.get('https://www.instagram.com/ssucomputerscience/?__a=1')
if resp.status_code != 200:
    # This means something went wrong.
    raise ApiError('GET USER {}'.format(resp.status_code))

userData = resp.json()['user']
userID = userData['id']

print (userID)


#for stuff in resp.json():
    #print (stuff)
    # print('{} {}'.format())
