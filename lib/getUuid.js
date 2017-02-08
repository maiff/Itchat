const request = require('superagent')

let logger = require('./log')

let time = new Date().getTime()
let uuidUrl = `https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb&          redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=zh_CN&_=${time}`


module.exports = function getUuid (fn) {
  request.get(uuidUrl).end((err, res) => {
    // console.log()
    let uuid = res.text.match(/\"(.+)\"/)[1]
    // console.log(uuid)
    logger.debug('uuid' + uuid)
    fn && fn(err, uuid)
  })
}
