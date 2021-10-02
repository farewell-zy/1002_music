// pages/songDetail/songDetail.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, // 标识音乐是否播放
    musicInfo: {},
    musicId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId = options.musicId
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId)
  },
  // 获取音乐详情的功能函数
  async getMusicInfo(musicId){
    let musicData = await request('/song/detail', {ids: musicId})
    this.setData({
      musicInfo: musicData.songs[0]
    })
    // 动态修改窗口标题
    wx.setNavigationBarTitle({
      title: this.data.musicInfo.name
    })
  },
  // 点击播放
  handleMusicPlay(){
    let isPlay = !this.data.isPlay
    this.setData({
      isPlay
    })
    let {musicId} = this.data 
    this.musicControl(isPlay, musicId)
  },
  async musicControl(isPlay, musicId){
    let backgroundAudioManager = wx.getBackgroundAudioManager()
    if(isPlay) {
      // 播放音乐
      let musicLinkData = await request('/song/url', {id: musicId})
      let musicLink = musicLinkData.data[0].url
      backgroundAudioManager.src = musicLink
      backgroundAudioManager.title = this.data.musicInfo.name
    } else {
      backgroundAudioManager.pause()
    }
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