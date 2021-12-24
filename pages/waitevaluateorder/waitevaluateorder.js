/*
 * @Author: your name
 * @Date: 2021-12-23 15:24:00
 * @LastEditTime: 2021-12-24 22:05:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\waitevaluateorder\waitevaluateorder.js
 */
// pages/waitevaluateorder/waitevaluateorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null
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
      url: app.globalData.host + 'showWaitEvaluateOrder',
      data: {
        consumerId: user.consumer.consumerId
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          order: res.data
        })
        wx.setStorageSync('waitreceiveorder', res.data);
      }
    })
  },
  Toafter_sales(option) {
    console.log(option);
    wx.navigateTo({
      events: {
        orderId: orderId
      },
      url: "../../pages/after-sales/after-sales"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})