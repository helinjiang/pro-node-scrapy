var _ = require('lodash');
var scrapy = require('node-scrapy');

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

    scrapy.scrape(url, model, function (err, data) {
        obj[url].t2 = +new Date();

        var _scrapy = {
            "t": obj[url].t2,
            "cost": obj[url].t2 - obj[url].t1
        };

        if (err) {
            _scrapy.status = 0;
            if (isFunc(errorCallback)) {
                errorCallback(_.assign({}, err, {
                    url:url,
                    _scrapy: _scrapy
                }));
            }
        } else {
            _scrapy.status = 1;
            if (isFunc(successCallback)) {
                successCallback(_.assign({}, data, {
                    url:url,
                    _scrapy: _scrapy
                }));
            }
        }
    });
}

function isFunc(f) {
    return typeof f === 'function';
}

module.exports = {
    scrape: scrapeAction
};