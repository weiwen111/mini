// miniprogram/pages/manager.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        step: "list",
        fileID: '',
        cloudPath: '',
        imagePath: '',
        pType: [],
        p_name: "",
        p_price: 0,
        p_image: "",
        p_type: "",
        queryResult: [],
        noticeID: "",
        notice: "",
        checked: ""

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onQueryList()
        this.setData({
            pType: app.globalData.pType,
            notice: app.globalData.notice,
            checked: app.globalData.checked,
            noticeID: app.globalData.noticeID
        })
    },


    getPname({detail}) {
        var val = detail.detail.value;
        this.setData({
            p_name: val
        });
    },

    getPprice({detail}) {
        var val = detail.detail.value;
        this.setData({
            p_price: val
        });
    },

    toNotice: function () {
        this.setData({
            step: "notice"
        })
    },

    getNotice({detail}) {
        var val = detail.detail.value;
        this.setData({
            notice: val
        });
    },

    handleNotice({detail = {}}) {
        this.setData({
            checked: detail.current
        });
    },

    resetNotice: function () {
        const that = this
        const db = wx.cloud.database()
        db.collection('notice').doc(this.data.noticeID).update({
            data: {
                checked: that.data.checked,
                notice: that.data.notice
            },
            success: res => {
                app.globalData.notice = that.data.notice
                app.globalData.checked = that.data.checked
                that.setData({
                    step: "list"
                })
            },
            fail: err => {
                icon: 'none',
                    console.error('[数据库] [更新记录] 失败：', err)
            }
        })
    },

    selectType() {
        this.setData({
            visible1: true
        });
    },

    handleCancel1() {
        this.setData({
            visible1: false
        });
    },

    handleClickItem1({detail}) {
        const name = this.data.pType[detail.index].name
        this.setData({
            visible1: false,
            p_type: name
        })
    },
    toProduct: function () {
        this.setData({
            step: "add"
        })
    },
    onAdd: function () {
        const db = wx.cloud.database()
        const that = this
        db.collection('product').add({
            data: {
                image: this.data.fileID,
                type: this.data.p_type,
                name: this.data.p_name,
                price: this.data.p_price
            },
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                that.setData({
                    step: "list"
                })
                that.onQueryList()
                wx.showToast({
                    title: '新增记录成功',
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
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
    // 上传图片
    doUpload: function () {
        const this_ = this
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
                const name = Math.random() * 1000000;
                const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)
                        this_.setData({
                            fileID: res.fileID,
                            cloudPath: cloudPath,
                            p_image: filePath
                        })

                        /* wx.navigateTo({
                             url: '../storageConsole/storageConsole'
                         })*/
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
    }
})