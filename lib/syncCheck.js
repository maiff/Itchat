let logger = require('./log')
const request = require('superagent')

let globalVal = require('./global')
let time = new Date().getTime()

module.exports = function syncCheck (fn) {
  let synckeyList = globalVal.SyncKey ? globalVal.SyncKey.List : []
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
    logger.debug('sync check')
    logger.trace('sync check res' + res.text)
    fn && fn(err, res.text)
  })
}
  // console.log(fn)