let logger = require('../lib/log')
const getQrCode = require('../lib/getQrCode')
module.exports = function (options) {
  this.on('getUuid', (err, uuid) => {
    err && logger.error(err)
    getQrCode(uuid, (qrcode) => {
      this.emit('getQrcode', err, qrcode)
    }, options)
  })
}
