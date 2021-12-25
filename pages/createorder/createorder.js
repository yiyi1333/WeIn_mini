/*
 * @Author: your name
 * @Date: 2021-12-17 16:39:44
 * @LastEditTime: 2021-12-25 11:28:04
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
    for (var i = 0; i < goods.length; i++) {
      for (var j = 0; j < goods[i].goodslist.length; j++) {
        if (goods[i].goodslist[j].goods.goodsRealPrice != 0) {
          sum += goods[i].goodslist[j].goods.goodsRealPrice * goods[i].goodslist[j].goodsnum;
        }
        else {
          sum += goods[i].goodslist[j].goods.goodsPrice * goods[i].goodslist[j].goodsnum;
        }

      }
    }
    this.setData({
      shops: goods,
      totalPrice: sum
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 地址管理
  getAddress() {
    var that = this;
    wx.chooseAddress({
      success(res) {
        that.setData({
          address: res
        })
      }
    })
  },
  //提交订单
  submitorder() {
    var that = this;
    const app = getApp();
    var temp = wx.getStorageSync('tempcart');
    var consumerId = wx.getStorageSync('user').consumer.consumerId;
    wx.request({
      url: app.globalData.host + 'createOrder',
      data: {
        shops: this.data.shops,
        address: this.data.address,
        consumerId: consumerId
      },
      success(res) {
        console.log(res);
        if (res.data == "createOrderSuccess") {
          //成功生成订单
          wx.showToast({
            title: '下单成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/cart/cart'
            });
          }, 2000)
        }
        else {
          //生成订单失败
          wx.showModal({
            title: '订单生成失败',
            content: '手慢了! 库存余量不足',
            showCancel: true,
            cancelText: '取消订单',
            confirmText: '继续下单',
            success: function (choose) {
              console.log(choose);
              if (choose.confirm) {
                //继续下单
                wx.request({
                  url: app.globalData.host + 'createLegalOrder',
                  data: {
                    shops: this.data.shops,
                    address: this.data.address,
                    consumerId: consumerId
                  },
                  success(res) {
                    console.log(res);
                    if (res.data == "createOrderSuccess") {
                      //成功生成订单
                      wx.showToast({
                        title: '下单成功',
                        icon: 'success',
                        duration: 2000
                      });
                      wx.setStorageSync('tempcart', null);
                      setTimeout(function () {
                        wx.switchTab({
                          url: '/pages/cart/cart'
                        });
                      }, 2000)
                    }
                    else {
                      //生成订单失败
                      wx.showModal({
                        title: '订单生成失败',
                        content: '手慢了! 库存余量不足',
                        showCancel: true,
                        cancelText: '取消订单',
                        confirmText: '继续下单',
                        success: function (choose) {
                          console.log(choose);
                          if (choose.confirm) {
                            //继续下单
                            createLegalOrder

                          }
                          else {
                            console.log("取消订单回滚");
                            // wx.setStorageSync('shops', temp);
                            wx.switchTab({
                              url: '/pages/cart/cart'
                            });
                          }
                        },
                        fail: function () {
                          wx.showToast({
                            title: '发生了未知错误，请联系客服',
                            icon: 'fail',
                            duration: 2000
                          })
                        }
                      })
                    }
                  }
                })
              }
              else {
                console.log("取消订单回滚");
                wx.setStorageSync('shops', temp);
                wx.switchTab({
                  url: '/pages/cart/cart'
                });
              }
            },
            fail: function () {
              wx.showToast({
                title: '发生了未知错误，请联系客服',
                icon: 'fail',
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
})