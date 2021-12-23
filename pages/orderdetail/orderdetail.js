/*
 * @Author: your name
 * @Date: 2021-12-23 00:37:41
 * @LastEditTime: 2021-12-23 14:27:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\orderdetail\orderdetail.js
 */
// pages/orderdetail/orderdetail.js
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
    //获取orderId;
    const { orderId } = options;
    console.log("orderId:" + orderId);
    this.getOrderDetail(orderId);
  },
  getOrderDetail(orderId) {
    var app = getApp();
    var that = this;
    wx.showLoading({
      title: 'Loading...'
    })
    wx.request({
      url: app.globalData.host + 'showOrderDetail',
      data: {
        orderid: orderId
      },
      success: (res) => {
        console.log(res);
        var date = res.data.orderDate;
        var dates = date.split('T');
        res.data.orderDate = dates[0];
        var time = res.data.orderTime;
        var times = time.split('T');
        res.data.orderTime = times[1];
        console.log(times);
        that.setData({
          order: res.data
        });
        wx.hideLoading();
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器请求错误',
          icon: 'error',
          duration: 2000
        })
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