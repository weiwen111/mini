//app.js
App({
  globalData: {
    pType: {
      jh: "精华",
      ys: "眼霜",
      sfs: "爽肤水",
      ry: "乳液",
      fd: "粉底",
      kh: "口红",
      jdy: "肌底液",
      fs: "防晒"
    }
  },
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})