let logger = require('../lib/log')
const getMesg = require('../lib/getMesg')
module.exports = function () {
  this.on('Mesg', (err, res) => {
    err && logger.error(err)
    getMesg((err, AddMsgList) => {
      let firstMsg = AddMsgList[0]
      firstMsg && this.emit('getMesg', err, AddMsgList, firstMsg.Content, firstMsg.FromUserName, firstMsg.MsgType)
      this.emit('syncCheck', err)
    })
  })
}
