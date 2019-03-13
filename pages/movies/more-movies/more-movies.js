var app = getApp();
var util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigateTitle: '',
        movies: [],
        requestUrl: '',
        totalCount: 0,
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var category = options.category;
        this.setData({
            navigateTitle: category
        });
        var dataUrl = '';
        switch (category) {
            case "正在热映":
                dataUrl = 'http://t.yushu.im/v2/movie/in_theaters';
                break;
            case "即将上映":
                dataUrl = 'http://t.yushu.im/v2/movie/coming_soon';
                break;
            case "豆瓣Top250":
                dataUrl = 'http://t.yushu.im/v2/movie/top250';
                break;
        };
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData);
    },

    processDoubanData: function (moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title.length >= 6 ? subject.title.substring(0, 6) : subject.title;
            var stars = parseInt(subject.rating.average) / 10 * 100;
            var temp = {
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id,
                stars: stars
            }
            movies.push(temp);
        };
        var totalMovies = [];
        if (!this.data.isEmpty) {
            totalMovies = this.data.movies.concat(movies);
        } else {
            totalMovies = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMovies
        });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle,
        })
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
        var refreshUrl = this.data.requestUrl + "?start=0&count=20";
        this.data.movies = [];
        this.data.isEmpty = true;
        this.data.totalCount = 0;
        util.http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
        util.http(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})