//app.js
App({
    globalData: {
        avatarUrl: "/image/user-unlogin.png",
        nickName: "陌生莲子",
        userInfo: {},
        openid: null,
        pType: [{id: "jh", name: "精华"},
            {id: "ys", name: "眼霜"},
            {id: "sfs", name: "爽肤水"},
            {id: "ry", name: "乳液"},
            {id: "fd", name: "粉底"},
            {id: "kh", name: "口红"},
            {id: "jdy", name: "肌底液"},
            {id: "fs", name: "防晒"},],
        notice: {
            notice: "这是莲莲的小程序",
            checked: true,
            _id: null,
            openid: []
        },
        cart: {},
        cartCount: 0
    },
    onLaunch: function () {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }

        //this.globalData = {}
    }
})