const checkLogin = require('../lib/checkLogin')
let logger = require('../lib/log')
module.exports = function () {
  this.on('checkLogin', (err, gv) => {
    err && logger.error(err)
    checkLogin((err, isLogin) => {
      if (isLogin) {
        console.log('login success')
        this.emit('syncCheck', err)
        this.emit('loginSuccess', err)
      } else {
        this.emit('start', err)
      }
    })
  })
}
