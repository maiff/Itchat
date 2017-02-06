const request = require('superagent')

let time = new Date().getTime()

module.exports = function isLogin (uuid, fn) {
  // console.log(fn)
  let isLoginUrl = `https://login.wx.qq.com/cgi-bin/mmwebwx-bin/login?loginicon=true&uuid=${uuid}&tip=0&r=130374730&_=${time}`
  // console.log(isLoginUrl)
  request.get(isLoginUrl)
  .set('Upgrade-Insecure-Requests', '1')
  .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/52.0.2743.116 Chrome/52.0.2743.116 Safari/537.36')
  .set('Connection', 'keep-alive')
  .end((err, res) => {
    err && console.log(err)
    let text = res.text
    // console.log(text)
    let rexgOutTime = /408/g
    let rexgIsScan = /userAvatar/g
    let rexgIsLogin = /redirect_uri/g
    if (rexgOutTime.test(text)) isLogin(uuid, fn)
    else if (rexgIsScan.test(text)) {
      console.log('comfirm to login')
      isLogin(uuid, fn)
    } else if (rexgIsLogin.test(text)) {
      // console.log(text)
      let redirectUri = text.match(/\"(.+)\"/)[1]
      // console.log(fn)
      fn && fn(err, redirectUri)
    } else {
      fn && fn(err, text)
    }
  })
}
