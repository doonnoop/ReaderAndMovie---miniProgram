// pages/movies/movies.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: [],
        comingSoon: [],
        top250:[],
        searchResult: [],
        containerShow: true,
        searchPanelShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var inTheatersUrl = "/v2/movie/in_theaters?statr=0&count=3";
        var comingSoonUrl = "/v2/movie/coming_soon?statr=0&count=3";
        var top250Url = "/v2/movie/top250?statr=0&count=3";
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "豆瓣Top250");
    },

    getMovieListData: function (url, listName, categoryTitle) {
        var that = this;
        wx.request({
            // url: 'https://douban.uieee.com' + url ,
            url: 'http://t.yushu.im' + url,
            method: 'GET',
            header: {
                "Content-Type": "application/text"
            },
            success: function (res) {
                console.log(res);
                that.processDoubanData(res.data, listName, categoryTitle);
            },
            fail: function(err) {
                console.log(err);
            }
        })
    },

    processDoubanData: function (moviesDouban, listName, categoryTitle) {
        var movies = [];
        for(var idx in moviesDouban.subjects) {
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
        var readyData = {};
        readyData[listName] = {
            categoryTitle: categoryTitle,
            movies: movies
        };
        this.setData(readyData);
    },

    onBindFocus: function() {
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },

    onCancelImgTap: function() {
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            searchResult : []
        })
    },

    onBindChange: function (event) {
        var text = event.detail.value;
        var searchUrl = '/v2/movie/search?q=' + text;
        this.getMovieListData(searchUrl, "searchResult", "");
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