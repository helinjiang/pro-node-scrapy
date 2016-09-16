var _ = require('lodash');
var Crawler = require("crawler");

var model = {
    author: '.author',
    repo: {
        selector: '.js-url-field',
        get: 'value'
    },
    stats: {
        commits: '.commits .num',
        branches: '.numbers-summary > li.commits + li .num',
        releases: '.numbers-summary > li.commits + li + li .num',
        contributors: '.numbers-summary > li.commits + li + li + li .num',
        social: {
            stars: '.pagehead-actions > li + li .js-social-count',
            forks: '.pagehead-actions > li + li + li .social-count'
        }
    }
};

var obj = {};

var c = new Crawler({
    maxConnections : 10,

    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        
        console.log(result.uri,result.statusCode);
        

    }
});

/**
 * 抓取某个url页面，并且将结果在回调里面返回
 * @param {string} url 要抓取的url页面
 * @param {function} successCallback
 * @param {function} errorCallback
 */
function scrapeAction(url, successCallback, errorCallback) {
    if (!url) {
        if (isFunc(errorCallback)) {
            errorCallback({
                _scrapy: {
                    status: -1,
                    errMsg: 'Empty url!'
                }
            });
        }
        return;
    }

    obj[url] = {};
    obj[url].t1 = +new Date();

    c.queue(url);

    // scrapy.scrape(url, model, function (err, data) {
    //     obj[url].t2 = +new Date();
    //
    //     var _scrapy = {
    //         "t": obj[url].t2,
    //         "cost": obj[url].t2 - obj[url].t1
    //     };
    //
    //     if (err) {
    //         _scrapy.status = 0;
    //         if (isFunc(errorCallback)) {
    //             errorCallback(_.assign({}, err, {
    //                 url:url,
    //                 _scrapy: _scrapy
    //             }));
    //         }
    //     } else {
    //         _scrapy.status = 1;
    //         if (isFunc(successCallback)) {
    //             successCallback(_.assign({}, data, {
    //                 url:url,
    //                 _scrapy: _scrapy
    //             }));
    //         }
    //     }
    // });
}

function isFunc(f) {
    return typeof f === 'function';
}

module.exports = {
    scrape: scrapeAction
};