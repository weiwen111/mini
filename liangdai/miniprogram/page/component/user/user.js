// page/component/new-pages/user/user.js
const app = getApp()
Page({
    data: {
        avatarUrl: '',
        nickname: '',
        orders: [],
        hasAddress: false,
        address: {}
    },
    onLoad() {
        var self = this;
        self.setData({
            nickname: app.globalData.nickName,
            avatarUrl: app.globalData.avatarUrl
        })
        const db = wx.cloud.database()
        const data = db.collection('order').where({
            _openid: app.globalData.openid
        }).orderBy('createTimes', 'desc').get({
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
        /*   /!**
            * 获取用户信息
            *!/
           wx.getUserInfo({
             success: function(res){
               self.setData({
                 thumb: res.userInfo.avatarUrl,
                 nickname: res.userInfo.nickName
               })
             }
           }),

           /!**
            * 发起请求获取订单列表信息
            *!/
           wx.request({
             url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
             success(res){
               self.setData({
                 orders: res.data
               })
             }
           })*/
    },
    onShow() {
        var self = this;
        /**
         * 获取本地缓存 地址信息
         */
        wx.getStorage({
            key: 'address',
            success: function (res) {
                self.setData({
                    hasAddress: true,
                    address: res.data
                })
            }
        })
    },
    /**
     * 发起支付请求
     */
    payOrders() {
        wx.requestPayment({
            timeStamp: 'String1',
            nonceStr: 'String2',
            package: 'String3',
            signType: 'MD5',
            paySign: 'String4',
            success: function (res) {
                console.log(res)
            },
            fail: function (res) {
                wx.showModal({
                    title: '支付提示',
                    content: '<text>',
                    showCancel: false
                })
            }
        })
    }
})