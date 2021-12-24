/*
 * @Author: your name
 * @Date: 2021-12-24 13:27:30
 * @LastEditTime: 2021-12-24 22:04:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\collection\collection.js
 */
// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求获取收藏夹记录
    var app = getApp();
    var user = wx.getStorageSync('user');
    var that = this;
    wx.showLoading({
      title: 'Loading...'
    })
    wx.request({
      url: app.globalData.host + 'selectAllCollection',
      data: ({
        customerId: user.consumer.consumerId
      }),
      success(res) {
        wx.hideLoading();
        //查询成功
        if (res.data != '查询失败') {
          for (var i = 0; i < res.data.length; i++) {
            var d = res.data[i].date;
            var ds = d.split('T');
            res.data[i].date = ds[0];
            var t = res.data[i].time;
            var ts = t.split('T');
            res.data[i].time = ts[1];
          }
          that.setData({
            collection: res.data
          })
        }
        //查询失败
        else {
          wx.showToast({
            title: res.data,
            icon: 'error',
            duration: 1500
          });
          setTimeout(function () {
            wx.navigateBack({});
          }, 1500)
        }
      }
    })
  },
})