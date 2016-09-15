var Scrapy = require('./util-scrape');

function go(url) {
    Scrapy.scrape(url, function (data) {
        console.log('[success] ', JSON.stringify(data));
    }, function (data) {
        console.error('[error] ', JSON.stringify(data));
    });
}

// 正常
go('https://github.com/facebook/react');
go('https://github.com/facebook/nuclide');
go('https://github.com/facebook/jest');
go('https://github.com/facebook/buck');

// 异常
go('https://github.com/facebook/react22');
go();
