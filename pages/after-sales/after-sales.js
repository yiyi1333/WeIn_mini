/*
 * @Author: your name
 * @Date: 2021-12-23 15:53:36
 * @LastEditTime: 2021-12-23 16:48:51
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
    num: null,
    descript: null,
    imgs: [],
    imgpath: null,
    count: 1
  },
  numchange(e) {
    console.log(e.detail.value);
  },
  input_descript(e) {
    console.log(e.detail.value);
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
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
          url: 'https://graph.baidu.com/upload',
          filePath: tempFilePaths[0],
          name: "file",
          header: {
            "content-type": "multipart/form-data"
          },
          success: function (res) {
            if (res.statusCode == 200) {
              wx.showToast({
                title: "上传成功",
                icon: "none",
                duration: 1500
              })
              that.data.imgs.push(JSON.parse(res.data).data)

              that.setData({
                imgs: that.data.imgs
              })
            }
          },
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
      content: "是否删除",
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.imgs.length; i++) {
            if (i == e.currentTarget.dataset.index) that.data.imgs.splice(i, 1)
          }
          that.setData({
            imgs: that.data.imgs
          })
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    })
  }
})