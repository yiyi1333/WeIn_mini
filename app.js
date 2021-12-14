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
    host: 'https://dbe6-115-200-25-44.ngrok.io/spring_prj1_Web_exploded/',
    code: null,
    appid: "wxc1b5e6fadc4b321a",
    appsecret: "a70d46afc23855a88469e5edbb80a6cd",
  }
})
