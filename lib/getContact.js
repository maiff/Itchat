const request = require('superagent')
let globalVal = require('./global')

let logger = require('./log')
let time = new Date().getTime()
module.exports = function getContact (fn) {
  let baseUrlContact = `${globalVal.protocol}${globalVal.baseUrl}/cgi-bin/mmwebwx-bin/webwxgetcontact?lang=zh_CN&pass_ticket=${globalVal.pass}&r=${time}&seq=0&skey=${globalVal.skey}`
  request.get(baseUrlContact)
  .redirects(0)
  .set('Cookie', globalVal.cookies)
  .set('Content-Type', 'application/json;charset=UTF-8')
  .end((err, res) => {
    logger.trace('contact list res' + res.text)
    let obj = JSON.parse(res.text)
    global.contact = obj
    logger.debug('get contact list successs!')
    fn && fn(err, res.text)
  })
}
