// page/component/details/details.js
Page({
    data: {
        goods: {
            id: 1,
            image: '/image/goods1.png',
            title: '新鲜梨花带雨',
            price: 0.01,
            stock: '有货',
            detail: '这里是梨花带雨详情。',
            parameter: '125g/个',
            service: '不支持退货'
        },
        product:{},
        num: 1,
        totalNum: 0,
        hasCarts: false,
        curIndex: 0,
        show: false,
        scaleCart: false
    },
    onLoad: function (option) {
        const id = option.id
        const db = wx.cloud.database()
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
        })
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
        let total = this.data.totalNum;

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
                    totalNum: num + total
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