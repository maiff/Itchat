let logger = require('../lib/log')
const notify = require('../lib/notify')

module.exports = function () {
  this.on('init', (err, obj) => {
    err && logger.error(err)
    notify((err, res) => { // set msgId
      this.emit('notify', err, res)
    })
  })
}
