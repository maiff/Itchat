const Itchat = require('../index')
const request = require('superagent')
let sendMesg = require('../lib/sendMesg')
const KEY = '8edce3ce905a4c1dbb965e6b35c3834d'
// const URL = require('url').URL
let apiUrl = 'http://www.tuling123.com/openapi/api'

// let baseUrlObj = new URL('https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage')
let test = new Itchat()
test.run({debug: true})

test.on('getMesg', (err, objList, content, from) => {
  err && console.log(err)
  // console.log(obj)
  console.log('you have message')
  if (objList[0].MsgType === 1) {
    let data = {
      'key': KEY,
      'info': content,
      'userid': 'wechat-robot'
    }

    request.post(apiUrl)
    .send(data)
    .end((err, res) => {
      err && console.log(err)
      let obj = JSON.parse(res.text)
      sendMesg({
        content: obj.text,
        ToUserName: from
      })
    })
  }
  
  // let text = obj.text
  // // let uuid = obj.uuid
  // let redirectUri = text.match(/\"(.+)\"/)[1]
  // // console.log(redirectUri)
  // // let redirectUriObj = new URL(redirectUri)
  // // let ticket = redirectUriObj.searchParams.get('ticket')
  // // let scan = redirectUriObj.searchParams.get('scan')
  // // console.log(baseUrlObj.toString()
  // // console.log(baseUrlObj)
  // // console.log(ticket)
  // request.get(redirectUri)
  // .redirects(0)
  // .end((err, res) => {
  //   err && console.log(err)
  //   console.log(res.text)
  // })
})
