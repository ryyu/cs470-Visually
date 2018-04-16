var rp = require('request-promise');




const getid = async (userArray, username) => {
    try {
        console.log('above resp...')
        let resp = await rp(`https://www.instagram.com/${username}/?__a=1`)

        console.log('below resp, above resp = JSON.parse(resp)...')
        resp = JSON.parse(resp)

        console.log('above let { user } = resp.graphql')
        let { user } = resp.graphql

        console.log('below {user}, above pushing to userArray')
        userArray.push({
          userID: user.id,
          numFollowers: user.edge_followed_by.count,
          numFollowing: user.edge_follow.count
        });

        console.log('below userArray.push, about catch....')
        } catch (e){
            console.log(e);
        }
        console.log('Inside code block after catch...')
}


let test = ['therock'];
var userArray = [];

async function printArray(userArray, username) {
    await getid(userArray, username);
    console.log(userArray)
}

printArray(userArray, 'therock');
