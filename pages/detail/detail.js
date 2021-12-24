/*
 * @Author: your name
 * @Date: 2021-12-03 20:09:26
 * @LastEditTime: 2021-12-24 13:31:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\detail\detail.js
 */
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodobject: null,
    goodsId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取goodsID;
    const { goodsId } = options;
    console.log("goodsID:" + goodsId);
    this.setData({
      goodsId: goodsId
    })
    this.getGoodsDetail(goodsId);
    this.addhistory();
  },

  getGoodsDetail(goodsId) {
    var app = getApp();
    var user = wx.getStorageSync('user');
    wx.request({
      url: app.globalData.host + 'displayGoodsDetail',
      data: {
        goodsId: goodsId,
        customerId: user.consumer.consumerId
      },
      success: (result) => {
        console.log(result);
        this.setData({
          goodobject: result.data
        })
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
  //历史记录
  addhistory() {
    var app = getApp();
    var user = wx.getStorageSync('user');
    var goodsId = this.data.goodsId;
    wx.request({
      url: app.globalData.host + 'addBrowsingHistory',
      data: {
        goodsId: goodsId,
        customerId: user.consumer.consumerId
      },
      success(res) {
        console.log(res);
      },
    })
  },
  //收藏商品
  collect() {
    var app = getApp();
    var user = wx.getStorageSync('user');
    var goodsId = this.data.goodsId;
    wx.request({
      url: app.globalData.host + 'addCollection',
      data: {
        goodsId: goodsId,
        customerId: user.consumer.consumerId
      },
      success(res) {
        //成功提示
        if (res.data == '加入收藏夹成功') {
          wx.showToast({
            title: res.data,
            icon: 'success',
            duration: 2000
          })
        }
        //失败提示
        else {
          wx.showToast({
            title: res.data,
            icon: 'error',
            duration: 2000
          })
        }
      },
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

  },
  addCart() {
    var app = getApp();
    var goods = this.data.goodobject;
    var user = wx.getStorageSync('user');
    var consumerId = user.consumer.consumerId;
    wx.request({
      url: app.globalData.host + 'addCart',
      data: {
        consumerId: consumerId,
        goodsId: goods.goodsId
      },
      success: (res) => {
        console.log("返回结果：", res);
        var data = res.data;
        if (data == '加入购物车异常') {
          //库存不足
          wx.showToast({
            title: "库存不足", // 提示的内容
            icon: "error",
            duration: 2000
          })
        }
        else {
          //更新后的数据写入缓存
          wx.showToast({
            title: "已经加入购物车",
            icon: "success",
            duration: 2000
          });
          wx.setStorageSync('cartInfo', data);
        }
      }
    })
  }
})