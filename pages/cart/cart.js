/*
 * @Author: your name
 * @Date: 2021-11-30 16:34:19
 * @LastEditTime: 2021-12-25 04:55:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\cart\cart.js
 */
// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    allChecked: false,
    shops: [],
    totalPrice: 0
  },
  CalculateTotalPrice: function () {
    var totalPrice = 0;
    var shops = this.data.shops;
    this.setData({
      totalPrice: totalPrice
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车数据
    var app = getApp();
    var that = this;
    var user = wx.getStorageSync('user');
    wx.showLoading({
      title: 'Loading...'
    })
    wx.request({
      url: app.globalData.host + 'getCart',
      data: {
        consumerId: user.consumer.consumerId
      },
      success: (result) => {
        console.log(result);
        this.setData({
          cart: result.data
        })
        wx.setStorageSync('cartInfo', result.data);
        //将复选框状态初始化为未选中
        var cart = result.data;
        var shops = [];
        for (var i = 0; i < cart.length; i++) {
          var shop = {
            shop: cart[i].shop,
            goodslist: [],
            checked: false
          };
          var glist = cart[i].goodsList;
          for (var j = 0; j < glist.length; j++) {
            var goods = {
              goods: glist[j].goods,
              goodsnum: glist[j].goodsNum,
              checked: false
            };
            shop.goodslist.push(goods);
          }
          shops.push(shop);
        }
        wx.hideLoading();
        this.setData({
          shops: shops
        })
        wx.setStorageSync('shops', shops);
        this.calculatePrice();
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取购物车数据
    var app = getApp();
    var that = this;
    var user = wx.getStorageSync('user');
    wx.request({
      url: app.globalData.host + 'getCart',
      data: {
        consumerId: user.consumer.consumerId
      },
      success: (result) => {
        console.log(result);
        this.setData({
          cart: result.data
        })
        wx.setStorageSync('cartInfo', result.data);
        //将复选框状态初始化为未选中
        var cart = result.data;
        var shops = [];
        for (var i = 0; i < cart.length; i++) {
          var shop = {
            shop: cart[i].shop,
            goodslist: [],
            checked: false
          };
          var glist = cart[i].goodsList;
          for (var j = 0; j < glist.length; j++) {
            var goods = {
              goods: glist[j].goods,
              goodsnum: glist[j].goodsNum,
              checked: false
            };
            shop.goodslist.push(goods);
          }
          shops.push(shop);
        }
        wx.hideLoading();
        this.setData({
          shops: shops
        })
        wx.setStorageSync('shops', shops);
        this.calculatePrice();
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var shops = this.data.shops;
    wx.setStorageSync('shops', shops);
    //更新后台数据
    var app = getApp();
    var user = wx.getStorageSync('user');
    var that = this;
    wx.request({
      url: app.globalData.host + 'updateCart',
      data: {
        shopsList: that.data.shops,
        consumerId: user.consumer.consumerId
      },
      success(res) {
        console.log(res);
      }
    })
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
  // 商品复选框
  handeItemChange(e) {
    //获取id
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    var shops = this.data.shops;
    var flag = false;
    for (var i = 0; i < shops.length; i++) {
      var gl = shops[i].goodslist;
      for (var j = 0; j < gl.length; j++) {
        if (gl[j].goods.goodsId === goods_id) {
          gl[j].checked = !gl[j].checked;
          flag = true;
          break;
        }
      }
      if (flag) break;
    }
    this.setData({
      shops: shops
    })
    //更新全选按钮
    this.updateAllcheck();
    //重新计算价格
    this.calculatePrice();
  },
  calculatePrice() {
    //计算价格
    var totalPrice = 0;
    var shops = this.data.shops;
    console.log(shops);
    for (var i = 0; i < shops.length; i++) {
      var gl = shops[i].goodslist;
      for (var j = 0; j < gl.length; j++) {
        //计算总价
        if (gl[j].checked) {
          if (gl[j].goods.goodsRealPrice != 0) {
            totalPrice += gl[j].goods.goodsRealPrice * gl[j].goodsnum;
          }
          else {
            totalPrice += gl[j].goods.goodsPrice * gl[j].goodsnum;
          }
        }
      }
    }
    this.setData({
      totalPrice: totalPrice
    })
  },
  //全选框更新
  updateAllcheck() {
    var shops = this.data.shops;
    var flag = true;
    for (var i = 0; i < shops.length; i++) {
      var gl = shops[i].goodslist;
      var f = true;
      for (var j = 0; j < gl.length; j++) {
        if (!gl[j].checked) {
          //有一个没有选中
          f = false;
          flag = false;
          break;
        }
      }
      shops[i].checked = f;
    }
    this.setData({
      allChecked: flag,
      shops: shops
    })
  },
  //点击店铺全选
  shopallcheck(e) {
    const shop_id = e.currentTarget.dataset.id;
    var shops = this.data.shops;
    for (var i = 0; i < shops.length; i++) {
      if (shops[i].shop.shopId === shop_id) {
        shops[i].checked = !shops[i].checked;
        for (var j = 0; j < shops[i].goodslist.length; j++) {
          shops[i].goodslist[j].checked = shops[i].checked;
        }
        break;
      }
    }
    //更新全选按钮
    this.updateAllcheck();
    //重新计算价格
    this.calculatePrice();
  },
  //点击全选按钮
  checkall() {
    var allchecked = this.data.allChecked;
    allchecked = !allchecked;
    var shops = this.data.shops;
    for (var i = 0; i < shops.length; i++) {
      shops[i].checked = allchecked;
      for (var j = 0; j < shops[i].goodslist.length; j++) {
        shops[i].goodslist[j].checked = allchecked;
      }
    }
    this.setData({
      allChecked: allchecked,
      shops: shops
    });
    this.calculatePrice();
  },
  //编辑商品数量
  ItemNumEdit(e) {
    const op = e.currentTarget.dataset.op;
    const id = e.currentTarget.dataset.id;
    var cartInfo = wx.getStorageSync('cartInfo');
    var shops = this.data.shops;
    var flag = false;
    for (var i = 0; i < shops.length; i++) {
      for (var j = 0; j < shops[i].goodslist.length; j++) {
        if (id === shops[i].goodslist[j].goods.goodsId) {
          if (shops[i].goodslist[j].goodsnum + op === 0) {
            wx.showModal({
              title: '提示',
              content: '确认要删除该商品吗?',
              success: (res) => {
                if (res.confirm) {
                  if (shops[i].goodslist.length === 1) {
                    shops.splice(i, 1);
                    cartInfo.splice(i, 1);
                  }
                  else {
                    shops[i].goodslist.splice(j, 1);
                    cartInfo[i].goodsList.splice(j, 1);
                  }
                  this.setData({
                    shops: shops
                  })
                } else if (res.cancel) {
                  console.log('取消')
                }
              }
            })
          }
          else if (op === 1 && shops[i].goodslist[j].goodsnum >= shops[i].goodslist[j].goods.goodsStock) {
            wx.showToast({
              title: '商品库存不足',
              icon: 'error',
              duration: 2000
            })
          }
          else {
            shops[i].goodslist[j].goodsnum += op;
            cartInfo[i].goodsList[j].goodsNum += op;
          }
          flag = true;
          break;
        }
      }
      if (flag) break;
    }
    this.setData({
      shops: shops
    })
    wx.setStorageSync('cartInfo', cartInfo);
    //重新计算价格
    this.calculatePrice();
  },
  pay() {
    //验证是否选择了商品
    var app = getApp();
    var shops = this.data.shops;
    var checknum = 0;
    for (var i = 0; i < shops.length; i++) {
      for (var j = 0; j < shops[i].goodslist.length; j++) {
        if (shops[i].goodslist[j].checked)
          checknum++;
      }
    }
    if (checknum === 0) {
      //未选择商品
      wx.showToast({
        title: '未选择商品',
        icon: 'error',
        duration: 2000
      })
    }
    else {
      var checkedshops = [];
      var temp = shops;
      wx.setStorageSync('tempcart', temp);
      for (var i = 0; i < shops.length; i++) {
        if (shops[i].checked) {
          checkedshops.push({
            shop: shops[i].shop,
            goodslist: shops[i].goodslist
          });
          temp.splice(i, 1);
          i--;
          continue;
        }
        var check = {
          shop: shops[i].shop,
          goodslist: []
        };
        for (var j = 0; j < shops[i].goodslist.length; j++) {
          if (shops[i].goodslist[j].checked) {
            check.goodslist.push(shops[i].goodslist[j]);
            temp[i].goodslist.splice(j, 1);
            j--;
          }
        }
        if (check.goodslist.length > 0) {
          checkedshops.push(check);
        }
      }
      wx.setStorageSync('checkedgoods', checkedshops);
      wx.navigateTo({
        url: '/pages/createorder/createorder'
      });
    }
  }
})