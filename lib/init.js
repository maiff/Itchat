const request = require('superagent')
let globalVal = require('./global')
// let time = new Date().getTime()
let logger = require('./log')

module.exports = function init (obj, fn) {
  // console.log(obj)
  let baseUrl = `${globalVal.protocol}${globalVal.baseUrl}/cgi-bin/mmwebwx-bin/webwxinit?pass_ticket=${obj.pass}&skey=${obj.skey}&r=-396505865`
  // https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=-405799313&lang=zh_CN&pass_ticket=duCQvcb3sxkKD%252BrgMfVTXfplxZKaMY6vfS8N7xRP41aFEon4XDYonYseCfNd43wv
  request.post(baseUrl)
  .set('Content-Type', 'application/json;charset=UTF-8')
  .send({
    BaseRequest: {
      Uin: obj.uin,
      Sid: obj.sid,
      Skey: obj.skey,
      DeviceID: 'e890803117785423'
    }
  })
  .end((err, res) => {
    let obj = JSON.parse(res.text)
    globalVal.UserName = obj.User.UserName
    globalVal.SyncKey = obj.SyncKey
    logger.debug('set username and synckey success')
    fn && fn(err, res.text)
  })
}
