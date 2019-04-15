const app = getApp()
Page({
    data: {
        needAuth: false,
        imgUrls: [
            '/image/b1.jpg',
            '/image/b2.jpg',
            '/image/b3.jpg'
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
                    this.setData({
                        needAuth: true
                    })
                }
            }
        })
        this.onQueryNotice()
        this.onQueryList()
    },
    onQueryNotice: function () {
        const that = this
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        db.collection('notice').get({
            success: res => {
                if (res.data && res.data[0]) {
                    app.globalData.notice = res.data[0].notice
                    app.globalData.checked = res.data[0].checked
                    app.globalData.noticeID = res.data[0]._id
                }
                that.setData({
                    // productList: JSON.stringify(res.data, null, 2)
                    notice: app.globalData.notice,
                    checked: app.globalData.checked
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
        db.collection('product').where({
            _openid: this.data.openid
        }).get({
            success: res => {
                this.setData({
                    // productList: JSON.stringify(res.data, null, 2)
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