var _ = require('lodash');
var Crawler = require("crawler");

function createRobot(callback) {
    return new Crawler({
        // 每次同时请求最大为 3 个
        maxConnections: 3,

        // 每个抓取的页面都会回调这个方法
        callback: function (error, result, done) {
            var url = result.options.uri,
                statusCode = result.statusCode;

            if (error) {
                /**
                 * error 是个 Error 对象：
                 * {
                  "code": "ENOTFOUND",
                  "errno": "ENOTFOUND",
                  "syscall": "getaddrinfo",
                  "hostname": "github3.com",
                  "host": "github3.com",
                  "port": 443,
                  "message": "getaddrinfo ENOTFOUND github3.com github3.com:443"
                }
                 */
                statusCode = 500;
            }

            const SCRAPY_STATUS = getScrapyStatus(url, statusCode);

            switch (statusCode) {
                case 200:
                    callback(_.assign({isSuccess: true}, SCRAPY_STATUS, {data: result}));
                    break;

                default:
                    callback(_.assign({isSuccess: false}, SCRAPY_STATUS, {error: error}));
                    break;
            }

            done();
        }
    });
}
function getScrapyStatus(url, statusCode) {
    return {
        _scrapy: {
            url: url,
            statusCode: statusCode
        }
    }
}

/**
 * 抓取url页面，并且将结果在回调里面返回
 *
 * @param {Array} urlArr 要抓取的url页面数组
 * @param {Function} callback
 * @param {Function} completeCallback
 */
function scrapeBatchAction(urlArr, callback, completeCallback) {
    if (!urlArr || !urlArr.length || !isFunc(callback)) {
        console.error('Wrong param!');
        return;
    }

    var robot = createRobot(callback);

    urlArr.forEach(function (url) {
        robot.queue({
            uri: url,
            timeout: 8 * 1000
        });
    });

    // robot.on('request',function(options){
    //     options._requestT = new Date().getTime();
    //     console.log('request', options)
    // });

    // robot.on('schedule',function(options){
    //     console.log('schedule', options)
    // });

    robot.on('drain', function () {
        if (isFunc(completeCallback)) {
            completeCallback();
        }
    });
}

function isFunc(f) {
    return typeof f === 'function';
}

// export default {
//     scrapeBatchAction:scrapeBatchAction
// };

module.exports = {
    scrapeBatchAction: scrapeBatchAction
};