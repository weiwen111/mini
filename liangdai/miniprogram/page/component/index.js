const app = getApp()
Page({
    data: {
        needAuth: false,
        imgUrls: [
            'https://6c69-liangdai-3338c2-1258956930.tcb.qcloud.la/my-image.jpg',
            'https://6c69-liangdai-3338c2-1258956930.tcb.qcloud.la/my-image.jpg?sign=1996f41cb031070d3a5ad3bbff070597&t=1557401936',
            'https://6c69-liangdai-3338c2-1258956930.tcb.qcloud.la/my-image555.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 3000,
        duration: 800,
    },
    onLoad: function () {
        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }
        this.onGetOpenid()
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            app.globalData.avatarUrl = res.userInfo.avatarUrl
                            app.globalData.nickName = res.userInfo.nickName
                            app.globalData.userInfo = res.userInfo
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                            })
                        }
                    })
                } else {
                    wx.hideTabBar({})
                    this.setData({
                        needAuth: true
                    })
                }
            }
        })
        this.onQueryNotice()
        this.onQueryList()
    },
    bindGetUserInfo: function (e) {
        console.log(e.detail.userInfo)
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
            app.globalData.nickName = e.detail.userInfo.nickName
            app.globalData.userInfo = e.detail.userInfo

            wx.showTabBar({})

            this.setData({
                needAuth: false
            })
        } else {
            //用户按了拒绝按钮
        }
    },

    onGetOpenid: function () {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
            }
        })
    },
    onQueryNotice: function () {
        const that = this
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        db.collection('notice').get({
            success: res => {
                if (res.data && res.data[0]) {
                    app.globalData.notice = res.data[0]
                }
                that.setData({
                    // productList: JSON.stringify(res.data, null, 2)
                    notice: app.globalData.notice.notice,
                    checked: app.globalData.notice.checked
                })
                console.log('[数据库] [查询记录] 成功: ', res)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                })
                console.error('[数据库] [查询记录] 失败：', err)
            }
        })
    },
    onQueryList: function () {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        db.collection('product').limit(6).orderBy('createTimes', 'desc').get({
            success: res => {
                this.setData({
                    productList: res.data
                })
                console.log('[数据库] [查询记录] 成功: ', res)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                })
                console.error('[数据库] [查询记录] 失败：', err)
            }
        })
    },
})