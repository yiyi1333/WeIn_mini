/*
 * @Author: your name
 * @Date: 2021-11-30 15:56:11
 * @LastEditTime: 2021-12-15 22:21:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\app.js
 */
// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        this.globalData.code = res.code;
      }
    })
  },
  globalData: {
    userInfo: null,
    host: 'https://b606-115-200-22-69.ngrok.io/spring_prj1_Web_exploded/',
    code: null,
    appid: "wxc1b5e6fadc4b321a",
    appsecret: "a70d46afc23855a88469e5edbb80a6cd",
  }
})
