const request = require('superagent')
let globalVal = require('./global')
let time = new Date().getTime()
module.exports = function notify (fn) {
  let baseUrl = `${globalVal.protocol}${globalVal.baseUrl}/cgi-bin/mmwebwx-bin/webwxstatusnotify?lang=zh_CN&pass_ticket=${globalVal.pass}`
  request.post(baseUrl)
  .set('Content-Type', 'application/json;charset=UTF-8')
  .send({
    BaseRequest: { Uin: globalVal.uin, Sid: globalVal.sid, Skey: globalVal.skey, DeviceID: globalVal.DeviceID },
    Code: 3,
    FromUserName: globalVal.UserName,
    ToUserName: globalVal.UserName,
    ClientMsgId: time
  })
  .end((err, res) => {
    let obj = JSON.parse(res.text)
    globalVal.MsgID = obj.MsgID
    fn && fn(err, res.text)
  })
}
