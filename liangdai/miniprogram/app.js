//app.js
App({
    globalData: {
        avatarUrl: "/image/user-unlogin.png",
        nickName: "陌生莲子",
        userInfo: {},
        openid: null,
        pType: [{id: "jh", name: "精华", icon:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2648132078,2366815783&fm=26&gp=0.jpg"},
            {id: "ys", name: "眼霜", icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555833900427&di=6a3087cd120faecf19cf5aa3c0d7473e&imgtype=0&src=http%3A%2F%2Fhzp.rayliimg.cn%2Fdatas%2Fuploadimage%2Fexperience%2F201801%2F31%2F20180131588970459.jpg"},
            {id: "sfs", name: "爽肤水", icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555834307863&di=b6db4faf03d150b8b6d1240ec2302ddf&imgtype=0&src=http%3A%2F%2Fa.vpimg2.com%2Fupload%2Fmerchandise%2Fpdcvis%2F2016%2F11%2F23%2F159%2F1e4a70a396be419eaf8b2b8b0cf04765-110.jpg"},
            {id: "ry", name: "乳液", icon:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3202724096,2357042866&fm=26&gp=0.jpg"},
            {id: "fd", name: "粉底", icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555834448438&di=fe6fadd1bae49449aeef7e5f14b33ea3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201602%2F27%2F20160227010428_vrdce.jpeg"},
            {id: "kh", name: "口红", icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555834480280&di=fbd851991bbc114f8c55f09923fee232&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn19%2F280%2Fw640h440%2F20180906%2Fe6e0-hitesuz3611945.jpg"},
            {id: "jdy", name: "肌底液", icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555834507720&di=70a6e716f47c94577f41dea56e1be02e&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2Fhibs5icFlovaibiaYsKwtDiaOzh8TbAxwuBEanlxtTvwXXI3eUcTyhMT07rTwwAOtjLuzhdX1gzYZd37PxcnFm1Zc9A%2F640%3Fwx_fmt%3Djpeg"},
            {id: "fs", name: "防晒", icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555834548937&di=67b2ede1e1e2b8c3e43f6c75deca3988&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fzhuzhou_house%2Fpics%2Fhv1%2F16%2F200%2F87%2F5708191.jpg"},],
        notice: {
            notice: "这是莲莲的小程序",
            checked: true,
            _id: null,
            openid: []
        },
        orderStatus: [
            {id: 1, name: "待发货"},
            {id: 2, name: "已发货"},
            {id: 3, name: "取消"},
        ],
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