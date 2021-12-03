/*
 * @Author: your name
 * @Date: 2021-12-03 20:09:26
 * @LastEditTime: 2021-12-03 21:02:23
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
    goodobject:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取goodsID;
    const {goodsId}=options;
    console.log("goodsID:" + goodsId);
    this.getGoodsDetail(goodsId);
  },

  getGoodsDetail(goodsId){
    var app =  getApp()
    wx.request({
      url:app.globalData.host + 'displayGoodsDetail',
      data:{
        goodsId:goodsId
      },
      success:(result)=>{
        console.log(result);
        this.setData({
          goodobject:result.data
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