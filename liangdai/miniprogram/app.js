//app.js
App({
    globalData: {
        avatarUrl: "/image/user-unlogin.png",
        nickName: "陌生莲子",
        userInfo: {},
        openid: null,
        pType: [{id: "jh", name: "精华", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "ys", name: "眼霜", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "sfs", name: "爽肤水", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "ry", name: "乳液", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "fd", name: "粉底", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "kh", name: "口红", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "jdy", name: "肌底液", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "fs", name: "防晒", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},],
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