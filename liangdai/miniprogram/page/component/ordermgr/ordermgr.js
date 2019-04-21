// miniprogram/page/component/ordermgr/ordermgr.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        pageSize: 10,
        pageIndex: 0,
        pageEnd: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.queryOrderList()
    },
    onShow() {
        if (app.globalData.orderUpdate) {
            app.globalData.orderUpdate = false
            this.setData({
                orders: [],
                pageIndex :0,
            })
            this.queryOrderList()
        }

    },
    onReachBottom() {
        if (!this.data.pageEnd) {
            this.queryOrderList()
        }
    },


    queryOrderList() {
        const self = this
        const db = wx.cloud.database()
        const data = db.collection('order')
            .skip(self.data.pageIndex * self.data.pageSize)
            .limit(self.data.pageSize)
            .orderBy('createTimes', 'desc').get({
                success: res => {
                    let temp = self.data.orders.concat(res.data)
                    self.setData({
                        orders: temp,
                        pageIndex: self.data.pageIndex + 1,
                        pageEnd: (res.data.length == self.data.pageSize) ? false : true
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
            });
    }

})