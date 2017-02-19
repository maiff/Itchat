let logger = require('../lib/log')
const getContact = require('../lib/getContact')

module.exports = function () {
  this.on('notify', (err, res) => {
    err && logger.error(err)
    getContact((err, res) => {
      this.emit('getContact', err, res)
    })
  })
}
