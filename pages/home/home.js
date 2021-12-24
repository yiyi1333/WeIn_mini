/*
 * @Author: your name
 * @Date: 2021-11-30 21:23:10
 * @LastEditTime: 2021-12-24 23:16:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\home\home.js
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading...',
    });
    //发送请求获取轮播图数据
    var app = getApp()
    wx.request({
      url: app.globalData.host + 'advertisement.action',
      success: (reslut) => {
        console.log(reslut);
        this.setData({
          swiperlist: reslut.data
        })
        wx.hideLoading();
      },
      fail: function () {
        wx.showToast({
          title: '发生了未知错误',
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