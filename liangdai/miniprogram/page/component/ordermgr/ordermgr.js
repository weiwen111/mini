// miniprogram/page/component/ordermgr/ordermgr.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this
        const db = wx.cloud.database()
        const data = db.collection('order').orderBy('createTime', 'desc').get({
            success: res => {
                self.setData({
                    orders: res.data
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
    },

})