// pages/personal/personal.js
import request from '../../utils/request'
// 手指起始坐标、移动实时坐标、手指移动距离
let startY = 0; 
let moveY = 0;
let moveDistance = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)', // 偏移
    coverTransiton: '', // 过渡
    userInfo: {}, // 用户信息
    recentPlayList: [] // 最近播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo
      })
      // 发送请求获取最近播放记录
      this.getRecentPlayData(this.data.userInfo.userId)
    }
  },
  // 手指点击
  handleTouchStart(event){
    this.setData({
      coverTransiton: ''
    })
    startY = event.touches[0].clientY;
  },
  // 移动
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if(moveDistance < 0) {
      return
    }
    if(moveDistance >= 80) {
      moveDistance = 80;
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  // 离开
  handleTouchEnd(){
    this.setData({
      coverTransform: 'translateY(0)',
      coverTransiton: 'transform 1s linear'
    })
  },
  // 登录
  toLogin(){
    // 判断用户是否已经登录
    if(this.data.userInfo.nickname){
      return
    }
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },
  // 获取最近播放记录
  async getRecentPlayData(userId){
    let result = await request('/user/record', {uid: userId, type: 0})
    let index = 0
    let recentPlayList = result.allData.slice(4, 10).map(item => {
      item.id = index++;
      return item
    })
    this.setData({
      recentPlayList
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