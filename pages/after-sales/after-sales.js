/*
 * @Author: your name
 * @Date: 2021-12-23 15:53:36
 * @LastEditTime: 2021-12-24 16:10:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \WeIn\pages\after-sales\after-sales.js
 */
// pages/after-sales/after-sales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    descript: null,
    imgpath: null,
    count: 1,
    order: null,
    goodsId: null,
    goodsnum: null,
    type: null
  },
  onLoad: function (options) {
    //获取orderId;
    const { orderId, goodsId } = options;
    this.setData({
      goodsId: goodsId
    })
    this.getOrderDetail(orderId);
  },
  getOrderDetail(orderId) {
    var app = getApp();
    var that = this;
    wx.showLoading({
      title: 'Loading...'
    })
    wx.request({
      url: app.globalData.host + 'showOrderDetail',
      data: {
        orderid: orderId
      },
      success: (res) => {
        console.log(res);
        var date = res.data.orderDate;
        var dates = date.split('T');
        res.data.orderDate = dates[0];
        var time = res.data.orderTime;
        var times = time.split('T');
        res.data.orderTime = times[1];
        var order = res.data;
        //找到本商品的数量
        for (var i = 0; i < order.goodsList.length; i++) {
          if (order.goodsList[i].goods.goodsId == that.data.goodsId) {
            that.setData({
              goodsnum: order.goodsList[i].goodsNum
            })
            break;
          }
        }
        that.setData({
          order: order
        });
        wx.hideLoading();
      },
      fail: (res) => {
        wx.showToast({
          title: '服务器请求错误',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  numchange(e) {
    this.setData({
      num: e.detail.value
    })
  },
  input_descript(e) {
    this.setData({
      descript: e.detail.value
    })
  },
  formSubmit(e) {
    //提交表单
    var that = this;
    var app = getApp();
    var user = wx.getStorageSync('user');
    wx.showModal({
      title: "提示",
      content: "确认表单已经填写完毕",
      success: function (res) {
        //确认
        if (res.confirm) {
          wx.request({
            url: app.globalData.host + "applyForRights",
            data: {
              goodsId: that.data.goodsId,
              goodsNum: that.data.num,
              descript: that.data.descript,
              imagePath: that.data.imgpath,
              consumerId: user.consumer.consumerId,
              orderId: that.data.order.orderId,
              type: that.data.type
            },
            //成功的回调函数
            success(res) {
              if (res.data == '申请成功') {
                wx.showToast({
                  title: res.data,
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(function () {
                  wx.navigateBack({})
                }, 2000);
              }
              else {
                wx.showToast({
                  title: res.data,
                  icon: 'error',
                  duration: 2000
                })
              }
            },
            //失败的回调函数
            fail(res) {
              wx.showToast({
                title: '服务器请求出错',
                icon: 'error',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
  typechange(e) {
    this.setData({
      type: e.detail.value
    })
  },
  bindUpload: function (e) {
    var that = this;
    var app = getApp();
    wx.chooseImage({
      count: that.data.count, // 默认1
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          imgpath: tempFilePaths[0]
        });
        wx.uploadFile({
          url: app.globalData.host + "Upload",
          filePath: tempFilePaths[0],
          name: "imageFile",
          header: {
            "content-type": "multipart/form-data"
          },
          //成功上传图片
          success: function (res) {
            if (res.statusCode == 200) {
              wx.showToast({
                title: "上传成功",
                icon: "none",
                duration: 1500
              })
              var path = JSON.parse(res.data);
              that.setData({
                imgpath: path
              })
            }
          },
          //图片上传失败提示
          fail: function (err) {
            wx.showToast({
              title: "上传失败",
              icon: "none",
              duration: 2000
            })
          },
          complete: function (result) {
            console.log(result.errMsg)
          }
        })
      }
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var that = this
    wx.showModal({
      title: "提示",
      content: "是否删除图片",
      //确认删除
      success: function (res) {
        if (res.confirm) {
          that.setData({
            imgpath: null
          })
        }
      }
    })
  }
})