/*
 * @Author: your name
 * @Date: 2021-11-30 16:34:19
 * @LastEditTime: 2021-12-15 00:31:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\my\my.js
 */
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //从缓存中读取数据
    var u = wx.getStorageSync('user');
    this.setData({
      user:u
    });
    
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

  getUserProfile(e){
    var app = getApp();
    wx.getUserProfile({
      desc: '用户获取微信头像和昵称',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        //将获取的头像和昵称传到后台进行存储，并修改本地的头像和昵称
        //更新本地和缓存
        var u = this.data.user;
        console.log(u);
        u.consumer.avatarUrl = res.userInfo.avatarUrl;
        u.consumer.nickName = res.userInfo.nickName;
        this.setData({
          user:u
        })
        wx.setStorageSync('user', u);
        //给后台发送数据
        wx.request({
          url: app.globalData.host + 'authorize',
          data: {
            phoneNumber: u.consumer.phoneNumber,
            nickName: u.consumer.nickName,
            avatarUrl: u.consumer.avatarUrl
          }
        })
      }
    })
  }
})