import request from '../../utils/request'
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [], // 轮播图数据
    recommendList: [],
    topList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitData()
  },
  // 动态初始化数据
  async getInitData(){
    // 获取轮播图数据
    let result = await request('/banner', {type: 2})
    this.setData({
      banners: result.banners
    })
    // 获取推荐歌曲
    result = await request('/personalized')
    this.setData({
      recommendList: result.result
    })
    let index = 0;
    let playlist = []
    while (index < 5) {
      result = await request('/top/list', {idx: index++})
      playlist.push({name: result.playlist.name, tracks: result.playlist.tracks})
    }
    this.setData({
      topList: playlist
    })
  },
  // 跳转至每日推荐
  toSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong'
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
