/*
 * @Author: your name
 * @Date: 2021-12-01 23:21:16
 * @LastEditTime: 2021-12-22 16:20:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\search\search.js
 */
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist: [],
  },
  //输入框改变之后就会触发
  handleInput(e) {
    //获取输入框的值
    const { value } = e.detail;
    if (!value.trim()) {
      return;
    }
    var app = getApp()
    wx.request({
      url: app.globalData.host + 'search',
      data: {
        keyword: value
      },
      success: (result) => {
        console.log(result);
        this.setData({
          goodslist: result.data
        })
      },
      fail: function () {
        wx.showToast({
          title: '发生了未知错误',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },
  // searchgoods(e){
  //   var keyword = this.data.keyword
  //   if(!keyword.trim()){
  //     return;
  //   }
  //   var app =  getApp()
  //   wx.request({
  //     url:app.globalData.host + 'search',
  //     data:{
  //       keyword: keyword
  //     },
  //     success:(result)=>{
  //       console.log(result);
  //       this.setData({
  //         goodslist:result.data
  //       })
  //     }
  //   })
  // },

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