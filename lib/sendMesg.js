const request = require('superagent')
let globalVal = require('./global')
let time = new Date().getTime()

module.exports = function sendMesg (obj) {
  let type = 1
  obj.type === undefined ? null : type = obj.type
  let fn = obj.fn
  let baseUrl = `${globalVal.protocol}${globalVal.baseUrl}/cgi-bin/mmwebwx-bin/webwxsendmsg?pass_ticket=${globalVal.pass}`

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
    Msg: {
      Type: type,
      Content: obj.content,
      FromUserName: globalVal.UserName,
      ToUserName: obj.ToUserName,
      LocalID: this.ClientMsgId,
      ClientMsgId: time + '' + (9000 * Math.random() + 1000)
    }
  })
  .end((err, res) => {
    let obj = JSON.parse(res.text)
    // console.log(obj.SyncCheckKey)
    fn && fn(err, obj) // array
  })
}
