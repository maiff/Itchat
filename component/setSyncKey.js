let logger = require('../lib/log')
const syncCheck = require('../lib/syncCheck')
const getMesg = require('../lib/getMesg')
module.exports = function () {
  this.on('notify', (err, res) => {
    err && logger.error(err)
    syncCheck((err, res) => {
      // let obj = eval(`(${res.match(/=(.+)/)[1]})`) // selector must to equal 2
      // console.log(obj.selector)
      this.emit('setSyncKey', err, res)
    })
  })

  this.once('setSyncKey', (err, res) => {
    err && logger.error(err)
    getMesg((err, res) => { // setSyncKey
      console.log('login success')
      this.emit('syncCheck', err)
      this.emit('loginSuccess', err)
    })
  })
}