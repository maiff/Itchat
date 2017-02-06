const EventEmitter = require('events')
const login = require('./lib/login')
const getUuid = require('./lib/getUuid')
const getQrCode = require('./lib/getQrCode')


// const openUrl = require('./lib/open.js')
module.exports = class Itchat extends EventEmitter {
  run (options) {
    getUuid((err, uuid) => {
      this.emit('getUuid', err, uuid)
    })

    this.on('getUuid', (err, uuid) => {
      getQrCode(uuid, (qrcode) => {
        this.emit('getQrcode', err, qrcode)
      }, options)
    })

    this.on('getUuid', (err, uuid) => {
      err && console.log(err)
      login(uuid, (err, status) => {
        // console.log(status)
        this.emit('login', err, status)
      })
    })
  }
}


