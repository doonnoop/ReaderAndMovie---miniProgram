var postData = require('../../../data/posts-data.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // postItem: {},
        // currentPostId,
        isPlayingMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var postId = options.postId;
        var postItem = postData.postList[postId];
        this.setData({
            postItem: postItem,
            currentPostId: postId
        })

        var postsCollection = wx.getStorageSync('posts_collection');
        if (postsCollection) {
            var postCollected = postsCollection[postId];
            this.setData({
                collected: postCollected
            })
        } else {
            var postsCollection = {};
            postsCollection[postId] = false;
            wx.setStorageSync('posts_collection', postsCollection)
        }
    },

    onCollectionTap: function() {
        var postsCollection = wx.getStorageSync('posts_collection');
        var postCollected = postsCollection[this.data.currentPostId];
        postCollected = !postCollected;
        postsCollection[this.data.currentPostId] = postCollected;
        
        this.showToast(postsCollection, postCollected);
        // this.showModal(postsCollection, postCollected);
    },

    showModal: function (postsCollection, postCollected) {
        var that = this;
        wx.showModal({
            title: '收藏',
            content: postCollected ? '收藏此文章？' : '取消收藏此文章？',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#333',
            confirmText: '确认',
            confirmColor: '#405f80',
            success: function(res) {
                if (res.confirm) {
                    wx.setStorageSync('posts_collection', postsCollection);
                    that.setData({
                        collected: postCollected
                    })
                }
            }
        })
    },

    showToast: function (postsCollection, postCollected) {
        wx.setStorageSync('posts_collection', postsCollection);
        this.setData({
            collected: postCollected
        })

        wx.showToast({
            title: postCollected ? '收藏成功' : '取消收藏',
            duration: 1000
        })
    },

    onShareTap: function() {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function(res){

            }
        })
    },

    onMusicTap: function(event) {
        var isPlayingMusic = this.data.isPlayingMusic;
        if(isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: this.data.postItem.music.url,
                title: this.data.postItem.music.title,
                coverImgUrl: this.data.postItem.music.coverImg
            })
            this.setData({
                isPlayingMusic: true
            })
        };
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})