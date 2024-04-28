import signIn from './sign_in.js'

var now = new Date();
signIn()
  .then(() => {
    console.log('执行签到成功！ ' , now ) 
  })
  .catch(error => {
    console.error('执行签到失败：', error.message, now )
    process.exit(1)
  })
