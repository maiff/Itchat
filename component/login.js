let logger = require('../lib/log')
const login = require('../lib/login')
module.exports = function () {
  this.on('getUuid', (err, uuid) => {
    err && logger.error(err)
    login(uuid, (err, obj) => {
      this.emit('login', err, obj)
    })
  })
}
