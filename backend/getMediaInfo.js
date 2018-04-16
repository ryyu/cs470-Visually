var rp = require('request-promise');

var mediaArray = [];

const getMediaInformation = async (username) => {
  try {
    let resp = await rp(`https://www.instagram.com/p/${username}/?__a=1`)
    resp = JSON.parse(resp)
    let { media } = resp.graphql
    console.log('Logging user... \n\n' + media + '\n\n')
    // mediaArray.push({
    //     sc: sc
    // })

  } catch (e){
    console.log(e)
  } // end catch
}





let test = ['BhQkr84lHam'];
// let test = ['therock']

test.forEach(async item => {
  await getMediaInformation(item)
  console.log(mediaArray);
})
