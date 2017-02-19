const getUuid = require('../lib/getUuid')
let logger = require('../lib/log')
module.exports = function () {
  this.on('start', (err) => {
    err && logger.error(err)
    getUuid((err, uuid) => {
      this.emit('getUuid', err, uuid)
    })
  })
}
