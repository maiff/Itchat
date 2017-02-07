const EventEmitter = require('events')
const login = require('./lib/login')
const getUuid = require('./lib/getUuid')
const getQrCode = require('./lib/getQrCode')
const getAuthInfo = require('./lib/getAuthInfo')
const init = require('./lib/init')
const notify = require('./lib/notify')
const getContact = require('./lib/getContact')
const syncCheck = require('./lib/syncCheck')
const getMesg = require('./lib/getMesg')
let globalVal = require('./lib/global')
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
      login(uuid, (err, obj) => {
        // console.log(status)
        this.emit('login', err, obj)
      })
    })

    this.on('login', (err, obj) => {
      err && console.log(err)
      let text = obj.text
      let redirectUri = text.match(/\"(.+)\"/)[1] + '&fun=new&version=v2'
      let baseUrl = redirectUri.match(/(wx.+com)/)[1]
      globalVal.baseUrl = baseUrl
      // console.log(baseUrl)
      // console.log(redirectUri)
      getAuthInfo(redirectUri, (err, obj) => {
        this.emit('getAuth', err, obj)
      })
    })

    this.on('getAuth', (err, obj) => {
      err && null //本身就会报错，没有重定向
      init(obj, (err, res) => { // set syncKey
        this.emit('init', err, res)
      })
    })

    this.on('init', (err, obj) => {
      err && console.log(err)
      notify((err, res) => { // set msgId
        this.emit('notify', err, res)
      })
    })

    this.on('notify', (err, res) => {
      err && console.log(err)
      getContact((err, res) => {
        this.emit('getContact', err, res)
      })
    })

    this.on('notify', (err, res) => {
      err && console.log(err)
      syncCheck((err, res) => {
        // let obj = eval(`(${res.match(/=(.+)/)[1]})`) // selector must to equal 2
        // console.log(obj.selector)
        this.emit('setSyncKey', err, res)
      })
    })

    this.once('setSyncKey', (err, res) => {
      err && console.log(err)
      getMesg((err, res) => { // setSyncKey
        console.log('login success')
        // console.log(res)
        this.emit('syncCheck', err)
      })
    })

    this.on('syncCheck', (err) => {
      err && console.log(err)
      syncCheck((err, res) => {
        // console.log('check')
        let obj = eval(`(${res.match(/=(.+)/)[1]})`)
        // console.log(obj.selector === '2')
        if (obj.selector === '2') this.emit('Mesg', err, res)
        else this.emit('syncCheck', err, res)
      })
    })

    this.on('Mesg', (err, res) => {
      err && console.log(err)
      getMesg((err, AddMsgList) => {
        let firstMsg = AddMsgList[0] 
        firstMsg && this.emit('getMesg', err, AddMsgList, firstMsg.Content, firstMsg.FromUserName, firstMsg.MsgType)
        this.emit('syncCheck', err)
      })
    })
  }
}


