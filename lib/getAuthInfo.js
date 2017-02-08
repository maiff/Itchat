const request = require('superagent')
let globalVal = require('./global')
let logger = require('./log')

let skeyReg = /<skey>(.+)<\/skey>/
let wxsidReg = /<wxsid>(.+)<\/wxsid>/
let wxuinReg = /<wxuin>(.+)<\/wxuin>/
let pass_ticketReg = /<pass_ticket>(.+)<\/pass_ticket>/
module.exports = function getAuthInfo (redirectUri, fn) {
  request.get(redirectUri)
  .redirects(0)
  .end((err, res) => {
    let text = res.text
    globalVal.skey = text.match(skeyReg)[1]
    globalVal.sid = text.match(wxsidReg)[1]
    globalVal.uin = text.match(wxuinReg)[1]
    globalVal.pass = text.match(pass_ticketReg)[1]
    globalVal.cookies = res.header['set-cookie']
    logger.trace('authMesg:' + JSON.stringify(globalVal))
    logger.trace('get authMesg res:' + text)
    logger.debug('get auth success!')
    fn && fn(err, globalVal)
  })
}

// https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage?ticket=A_WhbCkKFOivYkMNQzGax44P@qrticket_0&uuid=wfwPJ_ECLA==&lang=zh_CN&scan=1486464180
// https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage?ticket=A4MN8-WLd0xYwNsnfyhLB_y5@qrticket_0&uuid=4ZFDjP4s5A==&lang=zh_CN&scan=1486464008&fun=new&version=v2&lang=zh_CN
