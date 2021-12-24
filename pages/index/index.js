/*
 * @Author: your name
 * @Date: 2021-11-30 15:56:11
 * @LastEditTime: 2021-12-24 23:16:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\index\index.js
 */
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    phoneNumber: ''
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    //从缓存中获取手机号
    var phone = wx.getStorageSync('phoneNum');
    this.setData({
      phoneNumber: phone
    })
    if (phone != null && phone != '') {
      //跳转到主页
      wx.switchTab({
        url: '/pages/home/home',
      });
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
  getPhoneNumber(e) {
    var that = this;
    var app = getApp();
    let { encryptedData, iv } = e.detail;
    //检测是否登录
    wx.checkSession({
      success: (res) => {
        //后台进行解密
        wx.request({
          url: app.globalData.host + "decode",
          data: {
            code: app.globalData.code,
            appid: app.globalData.appid,
            appsecret: app.globalData.appsecret,
            encryptedData: encryptedData,
            iv: iv
          },
          success(phoneNumer) {
            console.log(phoneNumer);
            getApp().globalData.phoneNumer = phoneNumer.data.phoneNumber;
            wx.setStorageSync('phoneNum', phoneNumer.data.phoneNumber);
            that.setData({
              phoneNumber: phoneNumer.data.phoneNumber
            })
            //进行登录和注册业务请求
            wx.request({
              url: app.globalData.host + 'consumerLoginAndRegister',
              data: {
                phoneNumber: phoneNumer.data.phoneNumber
              },
              success(user) {
                console.log(user);
                wx.setStorageSync('user', user.data);
              }
            })
          }
        })
      },
      fail() {
        console.log("未登录");
      },
    });
    wx.switchTab({
      url: '/pages/home/home',
    });
  }
})