/*
 * @Author: your name
 * @Date: 2021-12-22 17:09:34
 * @LastEditTime: 2021-12-25 02:01:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\allorder\allorder.js
 */
// pages/allorder/allorder.js
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
      url: app.globalData.host + 'showAllOrder',
      data: {
        consumerId: user.consumer.consumerId
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          order: res.data
        })
        wx.setStorageSync('allorder', res.data);
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
  confirm(event) {
    var orderId = event.currentTarget.dataset.value;
    var app = getApp();
    var user = wx.getStorageSync('user');
    var that = this;
    wx.showModal({
      title: "提示",
      content: "确认已收到包裹",
      success: function (res) {
        //点击确认
        if (res.confirm) {
          //显示等待提示
          wx.showLoading({
            title: '确认收货中...'
          })
          //发送请求
          wx.request({
            url: app.globalData.host + 'confirmReceipt',
            data: {
              orderid: orderId
            },
            success(res) {
              wx.hideLoading();
              wx.showToast({
                title: res.data,
                icon: 'success',
                duration: 2000
              });
            }
          })
        }
      }
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