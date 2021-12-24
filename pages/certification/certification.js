/*
 * @Author: your name
 * @Date: 2021-12-24 13:27:30
 * @LastEditTime: 2021-12-25 01:25:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE  
 * @FilePath: \WeIn\pages\certification\certification.js
 */
// pages/certification/certification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    idnumber: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync('user');
    if (user.consumer.certification == 1) {
      wx.showToast({
        title: '已实名',
        icon: 'success',
        duration: 1000
      });
      setTimeout(function () {
        wx.navigateBack({})
      }, 1000);
    }
  },
  changeidnumber(e) {
    this.setData({
      idnumber: e.detail.value
    })
  },
  changename(e) {
    this.setData({
      name: e.detail.value
    })
  },
  formSubmit() {
    //提交表单
    var that = this;
    var app = getApp();
    var user = wx.getStorageSync('user');
    wx.showModal({
      title: "提示",
      content: "确认已经填写完毕",
      success: function (res) {
        //确认
        if (res.confirm) {
          wx.request({
            url: app.globalData.host + "Certification",
            data: {
              realName: that.data.name,
              idNumber: that.data.idnumber,
              consumerId: user.consumer.consumerId
            },
            //成功的回调函数
            success(res) {
              console.log(res);
              if (res.data == '身份证信息匹配') {
                wx.showToast({
                  title: res.data,
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(function () {
                  wx.navigateBack({})
                }, 2000);
              }
              else {
                wx.showToast({
                  title: res.data,
                  icon: 'error',
                  duration: 2000
                })
              }
            },
            //失败的回调函数
            fail(res) {
              wx.showToast({
                title: '服务器请求出错',
                icon: 'error',
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
})