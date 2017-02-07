const request = require('superagent')
let globalVal = require('./global')
let time = new Date().getTime()
module.exports = function getMesg (fn) {
  let baseUrl = `${globalVal.protocol}${globalVal.baseUrl}/cgi-bin/mmwebwx-bin/webwxsync?sid=${globalVal.sid}&skey=${globalVal.skey}pass_ticket=${globalVal.pass}`
  request.post(baseUrl)
  .set('Content-Type', 'application/json;charset=UTF-8')
  .set('Cookie', globalVal.cookies)
  .send({
    BaseRequest: {
      Uin: globalVal.uin,
      Sid: globalVal.sid,
      Skey: globalVal.skey,
      DeviceID: globalVal.DeviceID
    },
    SyncKey: globalVal.SyncKey,
    rr: ~time
  })
  .end((err, res) => {
    let obj = JSON.parse(res.text)
    globalVal.SyncKey = obj.SyncCheckKey
    // console.log(obj.SyncCheckKey)
    fn && fn(err, obj.AddMsgList) // array
  })
  // console.log(a)
}
