// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航列表
    navId: '', // 导航标识
    videoList: [], // 视频列表
    videoId: '', // video标识
    videoUpdateTime: [], // 标识播放记录时长
    isTriggered: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList()
  },
  // 获取标签页数据
  async getVideoGroupList() {
    let result = await request('/video/group/list')
    this.setData({
      videoGroupList: result.data.slice(0, 14),
      navId: result.data[0].id
    })
    this.getVideoList(this.data.navId)
  },
  // 获取视频列表
  async getVideoList(navId){
    let videoListData = await request('/video/group', {id: navId})
    if(!videoListData.datas){
      return
    }
    let index = 0
    let videoList = videoListData.datas.map(item => {
      item.id = index++
      return item
    })
    wx.hideLoading()
    this.setData({
      videoList,
      isTriggered: false
    })
  },
  // 点击切换标签样式
  changeNav(event){
    let navId = event.currentTarget.id * 1
    // let navId = event.currentTarget.dataset.id
    this.setData({
      // navId: navId >>> 0
      navId,
      videoListL: []
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(this.data.navId)
  },
  // 点击播放或继续播放
  hindlePlay(event){
    // 调用关闭视频的方法
    let vid = event.currentTarget.id
    this.setData({
      videoId: vid
    })
    // this.videoContext && this.vid !== vid && this.videoContext.stop()
    // this.vid = vid
    // 创建视频上下文对象
    this.videoContext = wx.createVideoContext(vid)
    // 判断是否有播放时间记录
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === vid)
    // 跳转
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime)
    }
    // 播放视频
    this.videoContext.play()
  },
  // 视频播放进度实时变化
  handleTimeupdate(event){
    // 收集已播放时长数据
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime}
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === event.currentTarget.id)
    if(videoItem){
      videoItem.currentTime = event.detail.currentTime
    } else {
      videoUpdateTime.push(videoTimeObj)
    }
    this.setData({
      videoUpdateTime
    })
  },
  // 视频播放结束
  handleEnded(event){
    // 将当前视频的播放记录移除
    let {videoUpdateTime} = this.data
    let start = videoUpdateTime.findIndex(item=> item.vid === event.currentTarget.id)
    videoUpdateTime.splice(start, 1)
    this.setData({
      videoUpdateTime
    })
  },
  // 上拉刷新
  handleRefresher(event){
    this.getVideoList(this.data.navId)
  },
  // 下拉触底
  async handleScrolltolower(){
    let {videoList, navId} = this.data;
    let newVideoList = await request('/video/group', {id: navId})
    // let index = Math.ceil(Math.random()*10000)
    let index = 10
    let newList = newVideoList.datas.map(item => {
      item.id = index++
      return item
    })
    videoList.push(...newList)
    this.setData({
      videoList
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
  onShareAppMessage: function ({from,}) {
    return {
      title: '嗷呜',
      page: '/pages/video/video'
    }
  }
})