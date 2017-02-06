const request = require('superagent')

const openUrl = require('./open')
const getUuId = require('./getUuid')

const fs = require('fs')
const qrcode = require('qrcode-terminal')

let qrCodeUrl = `https://login.weixin.qq.com/qrcode/`
let loginBaseUrl = 'https://login.weixin.qq.com/l/'
module.exports = function showQrCode (uuid, fn, option) {
  let stream = request(qrCodeUrl + uuid).pipe(fs.createWriteStream('qrcode.jpg'))
  stream.on('finish', () => {
    qrcode.generate(loginBaseUrl + uuid, (qrcode) => {
      console.log(qrcode)
      fn && fn(qrcode)
    })
  })
}

