const EventEmitter = require('events')
const login = require('./component/login')
const start = require('./component/start')
const getQrCode = require('./component/getQrCode')
const getAuthInfo = require('./component/getAuthInfo')
const init = require('./component/init')
const notify = require('./component/notify')
const getContact = require('./component/getContact')
const syncCheck = require('./component/syncCheck')
const getMesg = require('./component/getMesg')
const setSyncKey = require('./component/setSyncKey')
const checkLogin = require('./component/checkLogin')
const getGlobal = require('./component/getGlobal')

let globalVal = require('./lib/global')
let sendMesg = require('./lib/sendMesg')

let logger = require('./lib/log')
class Itchat extends EventEmitter {
  run (options) {
    options && options.debug && logger.setLevel('debug')

    getGlobal.bind(this)()
    checkLogin.bind(this)()
    start.bind(this)()
    getQrCode.bind(this, options)()
    login.bind(this)()
    getAuthInfo.bind(this)()
    init.bind(this)()
    notify.bind(this)()
    getContact.bind(this)()
    setSyncKey.bind(this)()
    syncCheck.bind(this)()
    getMesg.bind(this)()
  }
}
Itchat.globalVal = globalVal
Itchat.prototype.sendMesg = sendMesg
module.exports = Itchat
