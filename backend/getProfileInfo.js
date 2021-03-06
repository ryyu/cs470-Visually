var rp = require('request-promise');

var userArray = [];

const getProfileInformation = async (username) => {
  try {
    let resp = await rp(`https://www.instagram.com/${username}/?__a=1`)
    resp = JSON.parse(resp)
    let { user } = resp.graphql
    // console.log('Logging user... \n\n' + user + '\n\n')
    userArray.push({
      username: username,
      userID: user.id,
      numFollowers: user.edge_followed_by.count,
      numFollowing: user.edge_follow.count,
      externalUrl: user.external_url,
      fullName: user.full_name,
      profilePicUrl: user.profile_pic_url,
      profilePicUrlHd: user.profile_pic_url_hd
    })

  } catch (e){
    console.log(e)
  }
}





let test = ['instagram', 'selenagomez', 'therock'];

function testProfileInfo(callback) {
    test.forEach(async item => {
      await getProfileInformation(item)
  });
    callback()
}

testProfileInfo(function(){
    console.log(userArray)
});
