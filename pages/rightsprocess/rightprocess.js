/*
 * @Author: your name
 * @Date: 2021-12-24 23:23:44
 * @LastEditTime: 2021-12-25 02:29:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\rightsprocess\rightprocess.js
 */
// pages/rightsprocess/rightprocess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Info: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var user = wx.getStorageSync('user');
    var that = this;
    wx.showLoading({
      title: 'Loading...'
    })
    wx.request({
      url: app.globalData.host + 'selectAllRightsInfo',
      data: {
        consumerId: user.consumer.consumerId
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          Info: res.data
        })
      }
    })
  },
  acceptTap(event) {
    var rightsId = event.currentTarget.dataset.value;
    var app = getApp();
    var user = wx.getStorageSync('user');
    var that = this;
    wx.showModal({
      title: "提示",
      content: "确认接受商家的处理吗?",
      success: function (res) {
        //点击确认
        if (res.confirm) {
          //显示等待提示
          wx.showLoading({
            title: '提交请求...'
          })
          //发送请求
          wx.request({
            url: app.globalData.host + 'acceptTreatment',
            data: {
              safeRightsId: rightsId
            },
            success(res) {
              wx.hideLoading();
              if (res.data == '已接受') {
                wx.showToast({
                  title: res.data,
                  icon: 'success',
                  duration: 2000
                });
              }
              else {
                wx.showToast({
                  title: res.data,
                  icon: 'error',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  },
  refuseTap(event) {
    var rightsId = event.currentTarget.dataset.value;
    var app = getApp();
    var user = wx.getStorageSync('user');
    var that = this;
    wx.showModal({
      title: "提示",
      content: "确认拒绝商家的处理吗?",
      success: function (res) {
        //点击确认
        if (res.confirm) {
          //显示等待提示
          wx.showLoading({
            title: '提交请求...'
          })
          //发送请求
          wx.request({
            url: app.globalData.host + 'refuseTreatment',
            data: {
              safeRightsId: rightsId
            },
            success(res) {
              wx.hideLoading();
              if (res.data == '已拒绝') {
                wx.showToast({
                  title: res.data,
                  icon: 'success',
                  duration: 2000
                });
              }
              else {
                wx.showToast({
                  title: res.data,
                  icon: 'error',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  }
})