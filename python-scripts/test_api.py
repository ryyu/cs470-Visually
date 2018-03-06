import requests
import json
from instagram.client import InstagramAPI

ssu_compsci_uid = 7173266720
therock_uid = 232192182
ryanhyu = 1382784677

access_token = "7173266720.93e2292.9bbdaec8581247fb801f65b2c8d8f73c"
client_secret = "90917145777f46078172b70d15bd975a"
api = InstagramAPI(access_token=access_token, client_secret=client_secret)
followers = api.user_follows(ssu_compsci_uid)[0]

apiPath = 'https://www.instagram.com/'
apiEnd = '/?__a=1'


for f in followers:
    resp = requests.get(apiPath + f.username + apiEnd)
    if resp.status_code != 200:
    # This means something went wrong.
        raise ApiError('GET USER {}'.format(resp.status_code))
    userData = resp.json()['user']
    userID = userData['id']
    print(f.username)
    print(userID)



#print(api.user(ryanhyu))
