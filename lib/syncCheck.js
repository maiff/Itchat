//https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=1486467205517&skey=%40crypt_d72d99a3_95c38b30e8bef424e785d6f7a23807b4&sid=1FYQzC4Jnou%2BJiku&uin=569262663&deviceid=e942018091019900&synckey=1_655230953%7C2_655230975%7C3_655230934%7C1000_1486462321&_=1486467204600

//https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=1486469994041&skey=%40crypt_d72d99a3_c6058d966130e7e8e87ffbd8aba6d962&sid=f3iM2iqCeQBKtmBa&uin=569262663&deviceid=e759121866636953&synckey=1_655230953%7C2_655230985%7C3_655230934%7C11_655230816%7C13_655230816%7C201_1486469993%7C1000_1486462321%7C1001_1486462351%7C1004_1484916465&_=1486469986165

//https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=1486470144604&skey=%40crypt_d72d99a3_c6058d966130e7e8e87ffbd8aba6d962&sid=f3iM2iqCeQBKtmBa&uin=569262663&deviceid=e987121812258462&synckey=1_655230953%7C2_655230985%7C3_655230934%7C11_655230816%7C13_655230816%7C201_1486469993%7C1000_1486462321%7C1001_1486462351%7C1004_1484916465&_=1486469986171

//https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=1486469889128&skey=%40crypt_d72d99a3_92d6368980f1cbc0bbe36363471b6533&sid=lBZu8UT0vrBAlbtB&uin=569262663&deviceid=e544971181972463&synckey=1_655230953%7C2_655230981%7C3_655230934%7C1000_0&_=1486469889128
//1_660811614|2_660811678|3_660811611|11_660811663|13_660800082|201_1486470221|203_1486467382|1000_1486462321|1001_1486462351|1004_1484916465


const request = require('superagent')

let globalVal = require('./global')
let time = new Date().getTime()

module.exports = function syncCheck (fn) {
  let synckeyList = globalVal.SyncKey.List
  let synckey = ''
  for (let i = 0; i < synckeyList.length; i++) {
    synckey += `${synckeyList[i].Key}_${synckeyList[i].Val}`
    if (i !== synckeyList.length - 1) synckey += '|'
  }
  let baseUrl = `${globalVal.protocol}webpush.${globalVal.baseUrl}/cgi-bin/mmwebwx-bin/synccheck`
  let query = {
    r: time,
    skey: globalVal.skey,
    sid: globalVal.sid,
    uin: globalVal.uin,
    deviceid: globalVal.DeviceID,
    synckey: synckey,
    _: time
  }
  // console.log(baseUrl)
  request.get(baseUrl)
  .set('Cookie', globalVal.cookies)
  .query(query)
  .set('Cookie', globalVal.cookies)
  .end((err, res) => {
    // console.log(res.text)
    // console.log(res.path)    
    fn && fn(err, res.text)
  })
}
  // console.log(fn)