// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 动态收集数据
  handleInput(event){
    let type = event.currentTarget.id;
    this.setData({
      [type]: event.detail.value
    })
  },
  async login(){
    // 收集表单数据
    let {phone, password} = this.data;
    // 前端验证
    // 手机号
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error'
      })
      return
    } 
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error'
      })
      return
    }
    // 密码
    if(!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error'
      })
      return
    }
    // 后端
    let result = await request('/login/cellphone', {phone, password, isLogin: true})
    if(result.code === 200){
      wx.showToast({
        title: '登录成功'
      })
      // 用户信息本地存储
      wx.setStorageSync('userInfo', result.profile)

      // 跳转
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
    } else {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'error'
      })
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