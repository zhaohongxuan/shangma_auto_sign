
const signIn = require("./sign_in.js")
const cookies  = process.env.COOKIES;
// const cookies = "Your Test Cookie"

signIn(cookies).then(()=>{
  console.log('执行签到成功！');
}).catch((error)=>{
  console.error('执行签到失败：', error.message);
  process.exit(1); 
});