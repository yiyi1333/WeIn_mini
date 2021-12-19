/*
 * @Author: your name
 * @Date: 2021-12-17 16:39:44
 * @LastEditTime: 2021-12-17 23:45:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\createorder\createorder.js
 */
// pages/createorder/createorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: [],
    address: null,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取shops
    var goods = wx.getStorageSync('checkedgoods');
    console.log(goods);
    var sum = 0;
    for(var i = 0; i < goods.length; i++){
      for(var j = 0; j < goods[i].goodslist.length; j++){
        sum += goods[i].goodslist[j].goods.goodsPrice * goods[i].goodslist[j].goodsnum;
      }
    }
    this.setData({
      shops: goods,
      totalPrice: sum
    });
    var temp = wx.getStorageSync('tempcart');
    wx.setStorageSync('shops', temp);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
    // 地址管理
  getAddress(){
    var that = this;
    wx.chooseAddress({
      success (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        that.setData({
          address: res
        })
      }
    })
  }
})