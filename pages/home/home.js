// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送请求获取轮播图数据
    wx.request({
      url: 'https://3c5f-115-200-29-88.ngrok.io/spring_prj1_Web_exploded/advertisement.action',
      success:(reslut) =>{
        console.log(reslut);
        this.setData({
          swiperlist:reslut.data
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