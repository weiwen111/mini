const app = getApp()
Page({
    data: {
        category: [
            {name: '果味', id: 'guowei'},
            {name: '蔬菜', id: 'shucai'},
            {name: '炒货', id: 'chaohuo'},
            {name: '点心', id: 'dianxin'},
            {name: '粗茶', id: 'cucha'},
            {name: '淡饭', id: 'danfan'}
        ],
        productList: [],
        curIndex: 0,
        categoryName: "",
        isScroll: false,
        toView: 'guowei'
    },
    onReady() {
        var self = this;

        self.setData({
            category: app.globalData.pType,
            categoryName: this.data.category[0].name
        })
        self.onQueryList(this.data.category[0].name, self)
        /*wx.request({
            url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
            success(res){
                self.setData({
                    detail : res.data
                })
            }
        });*/

    },
    onQueryList: function (type, _this) {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        db.collection('product').where({
            type: type
        }).get({
            success: res => {
                _this.setData({
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
    switchTab(e) {
        const self = this;
        this.setData({
            isScroll: true
        })
        const categoryName = self.data.category[e.target.dataset.index].name
        setTimeout(function () {
            self.onQueryList(categoryName, self)
            self.setData({
                toView: e.target.dataset.id,
                curIndex: e.target.dataset.index,
                categoryName: categoryName
            })
        }, 0)
        setTimeout(function () {
            self.setData({
                isScroll: false
            })
        }, 1)

    }

})