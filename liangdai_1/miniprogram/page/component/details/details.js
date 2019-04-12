// page/component/details/details.js
const app = getApp()
Page({
    data: {
        product: {},
        num: 1,
        cartCount: 0,
        hasCarts: false,
        curIndex: 0,
        show: false,
        scaleCart: false
    },
    onLoad: function (option) {
        const product = JSON.parse(decodeURIComponent(option.id))
        this.setData({
            product: product,
            cartCount: app.globalData.cartCount,
            hasCarts: (app.globalData.cartCount > 0 ? true : false)
        })
        /*       const db = wx.cloud.database()
               // 查询当前用户所有的 counters
               db.collection('product').where({
                   _id: id
               }).get({
                   success: res => {
                       this.setData({
                           // queryResult: JSON.stringify(res.data, null, 2)
                           product: res.data[0]
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
               })*/
    },

    addCount() {
        let num = this.data.num;
        num++;
        this.setData({
            num: num
        })
    },

    addToCart() {
        const self = this;
        const num = this.data.num;
        let total = app.globalData.cartCount
        app.globalData.cartCount += num

        const cart = app.globalData.cart
        const id = self.data.product._id
        if (!cart[id]) {
            cart[id] = self.data.product
            cart[id].num = 0
            cart[id].selected = true
        }
        cart[id].num += num

        self.setData({
            show: true
        })
        setTimeout(function () {
            self.setData({
                show: false,
                scaleCart: true
            })
            setTimeout(function () {
                self.setData({
                    scaleCart: false,
                    hasCarts: true,
                    cartCount: num + total
                })
            }, 200)
        }, 300)

    },

    bindTap(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        this.setData({
            curIndex: index
        })
    }

})