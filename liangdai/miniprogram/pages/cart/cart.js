// miniprogram/pages/cart/cart.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const cartA = app.globalData.cart
        const list = []
        for(var k in cartA){
            list.push(k)
        }
        this.setData({
            cartList: list
        })
    },
    setNumber(event) {
        this.setData({
            [`productList[${event.target.id}].quantnum`]: this.data.quantnum
        })
    },
    handleChange1({detail}) {
        this.setData({
            quantnum: detail.value
        })
    },
})