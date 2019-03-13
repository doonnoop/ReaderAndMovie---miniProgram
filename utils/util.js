function http(url, callback) {
    wx.request({
        url: url,
        // url: 'http://t.yushu.im' + url + '?statr=0&count=3',
        method: 'GET',
        header: {
            "Content-Type": "application/text"
        },
        success: function (res) {
            callback(res.data);
        },
        fail: function (err) {
            console.log(err);
        }
    })
}

function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + "/";
    }
    return castsjoin.substring(0, castsjoin.length-2);
}

function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
