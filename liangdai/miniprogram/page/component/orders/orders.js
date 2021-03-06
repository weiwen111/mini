// page/component/orders/orders.js
const app = getApp()
Page({
    data: {
        address: {},
        hasAddress: false,
        isView: false,
        total: 0,
        comment: "",
        orderId: null,
        products: []
    },

    onLoad(option) {
        if (option && option.order) {
            // 订单预览
            const order = JSON.parse(decodeURIComponent(option.order))
            this.setData({
                products: order.products,
                address: order.address,
                comment: order.comment,
                orderId: order._id,
                isView: true
            })
        } else {
            // 订单确认
            const cartA = app.globalData.cart
            const list = []
            for (var k in cartA) {
                if (cartA[k].selected) {
                    list.push(cartA[k])
                }
            }
            this.setData({
                products: list,
                isView: false
            })
            const self = this;
            wx.getStorage({
                key: 'address',
                success(res) {
                    self.setData({
                        address: res.data,
                        hasAddress: true
                    })
                }
            })
            this.getTotalPrice();
        }
        this.getTotalPrice();
    },

    onShow: function () {
        if (!this.data.isView) {
            const self = this;
            wx.getStorage({
                key: 'address',
                success(res) {
                    self.setData({
                        address: res.data,
                        hasAddress: true
                    })
                }
            })
        }
    },

    /**
     * 计算总价
     */
    getTotalPrice() {
        let products = this.data.products;
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total += products[i].num * products[i].price;
        }
        this.setData({
            total: total.toFixed(2)
        })
    },
    getComment({detail}) {
        const val = detail.detail.value;
        this.setData({
            comment: val
        });
    },
    changeOrderStatus(res) {
        const status = res.currentTarget.dataset.status
        const that = this
        const modifyTimes = Date.parse(new Date());

        wx.cloud.callFunction({
            name: 'dbupdate',
            data:{
                _id: that.data.orderId,
                table: "order",
                dataset: {
                    status: status,
                    modifyTimes: modifyTimes
                }
            },
            success: res => {
                console.log('更新数据成功')
                app.globalData.orderUpdate = true
                wx.showModal({
                    title: '提示',
                    content: '修改成功',
                    text: 'center',
                    complete() {
                        wx.navigateBack();
                    }
                })

            }
        })
    },

    toPay() {
        wx.showModal({
            title: '提示',
            content: '本系统只做演示，支付系统已屏蔽',
            text: 'center',
            complete() {
                wx.switchTab({
                    url: '/page/component/user/user'
                })
            }
        })
    },
    volidate() {
        let msg = ""
        if(!this.data.address.detail || this.data.address.detail.length==0){
            msg="请输入详细地址"
        }else if(!this.data.address.name || this.data.address.name.length==0){
            msg="请输入收货人"
        }else if(!this.data.address.phone || this.data.address.phone.length==0){
            msg="请输入收货电话"
        }

        if(msg !=""){
            wx.showModal({
                title: '提示',
                content: msg,
                text: 'center',
                complete() {
                    return false
                }
            })
            return false
        }
        return true
    },
    toOrder() {
        //const products = encodeURIComponent(JSON.stringify(this.data.products))
        if(!this.volidate()){
            return
        }
        const products = this.data.products
        const comment = this.data.comment
        const total = this.data.total
        const address = this.data.address
        const createTimes = Date.parse(new Date());

        products.forEach(product => {
            delete app.globalData.cart[product._id]
        })


        const db = wx.cloud.database()
        db.collection('order').add({
            data: {
                avatarUrl: app.globalData.avatarUrl,
                nickName: app.globalData.nickName,
                address: address,
                products: products,
                comment: comment,
                total: total,
                createTimes: createTimes
            },
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                    counterId: res._id
                })
                app.globalData.fromOrder = true
                wx.showModal({
                    title: '提示',
                    content: '下单成功',
                    text: 'center',
                    complete() {
                        wx.switchTab({
                            url: '/page/component/user/user'
                        })
                    }
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
    }
})