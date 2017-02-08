# API
目前代码还在完善，欢迎pr，只写现在有的api。

## 前言

考虑到微信的外国市场占有率就不用英文写了，然后所有api采用如下形式：
```
let Itchat = require('itchat')
let test = new Itchat()
test.on('Event', (err, args) => {
  //your code
})
```

### get uuid

```
test.on('getUuid', (err, uuid) => {

})
```

### login
```
test.on('login', (err, obj) => {
  // obj.text 为登录成功返回的信息包含重定向的地址
  // obj.uuid
})
```

### getAuth
```
test.on('getAuth', (err, obj) => {
  // obj.skey 
  // obj.sid 
  // obj.uin 
  // obj.pass 
  // obj.cookies
})
```

### getMesg
```
test.on('getMesg', (err, AddMsgList, firstMsg.Content, firstMsg.FromUserName, firstMsg.MsgType) => {
  // AddMsgList为收到消息列表

})
```