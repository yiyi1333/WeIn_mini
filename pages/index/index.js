/*
 * @Author: your name
 * @Date: 2021-11-30 15:56:11
 * @LastEditTime: 2021-12-13 23:55:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\index\index.js
 */
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    wx.getUserProfile({
      desc: '用于获取用户的购物记录数据', 
      success: (res) => {
		console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
		wx.setStorageSync('rawData', res.rawData);
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber (e) {
    console.log(e);
    let {encryptedData, iv} = e.detail;
	  console.log(encryptedData);
    // 检测是否登录
    wx.checkSession({
      success: (res) => {
		var app =  getApp();
        //后台进行解密
        wx.request({
          url: app.globalData.host + "decode",
          data:{
			code: app.globalData.code,
			appid: app.globalData.appid,
			appsecret: app.globalData.appsecret,
			encryptedData: encryptedData,
			iv: iv
		  },
		  success(phoneNumer){
			  console.log(phoneNumer);
			  getApp().globalData.phoneNumer = phoneNumer.data.phoneNumber;
			  wx.setStorageSync('phoneNubmer', phoneNumer.data.phoneNumber);
		  }
        })
      },
      fail(){
        console.log("未登录");
      }
    })
  }
})