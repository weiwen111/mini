//index.js
const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        canIUse: false,
        queryResult:[]
    },

    onLoad: function () {
        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }
        this.setData({
            notice: app.globalData.notice,
            checked: app.globalData.checked
        })
        this.onQueryNotice()
        this.onQueryList()

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                } else {
                    this.setData({
                        canIUse: true
                    })
                }
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
                    app.globalData.notice = res.data[0].notice
                    app.globalData.checked = res.data[0].checked
                    app.globalData.noticeID = res.data[0]._id
                }
                that.setData({
                    // queryResult: JSON.stringify(res.data, null, 2)
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
                    // queryResult: JSON.stringify(res.data, null, 2)
                    queryResult: res.data
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
    bindGetUserInfo: function (e) {
        console.log(e.detail.userInfo)
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            this.setData({
                canIUse: false,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        } else {
            //用户按了拒绝按钮
        }
    },

    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
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
                wx.navigateTo({
                    url: '../userConsole/userConsole',
                })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                wx.navigateTo({
                    url: '../deployFunctions/deployFunctions',
                })
            }
        })
    },
    setNumber(event) {
        this.setData({
            [`queryResult[${event.target.id}].quantnum`]: this.data.quantnum
        })
    },
    handleChange1 ({ detail }) {
        this.setData({
            quantnum: detail.value
        })
    },

    // 上传图片
    doUpload: function () {
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {

                wx.showLoading({
                    title: '上传中',
                })

                const filePath = res.tempFilePaths[0]

                // 上传图片
                const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)

                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath

                        wx.navigateTo({
                            url: '../storageConsole/storageConsole'
                        })
                    },
                    fail: e => {
                        console.error('[上传文件] 失败：', e)
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败',
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })

            },
            fail: e => {
                console.error(e)
            }
        })
    },

    goMgr: function () {
        wx.navigateTo({
            url: '../manager/manager',
        })
    }

})
