var Scrapy = require('./utils');

var correctArr = [
        'https://github.com/facebook/react',
        'https://github.com/facebook/nuclide',
        'https://github.com/facebook/jest',
        'https://github.com/facebook/buck'
    ],
    wrongArr = [
        // 'https://github22.com/facebook/react',
        'https://github.com/facebook/react22'
    ],
    arr = ['https://github.com/facebook/react'];

// arr = correctArr.concat(wrongArr);

Scrapy.scrapeBatchAction(arr, function (result) {
    if (!result.isSuccess) {
        console.error('抓取失败！', result._scrapy);
        return;
    }

    console.log('抓取成功！', result._scrapy);

    var $ = result.data.$;

    console.log('author', $('.author').text());

}, function () {
    console.log('\n------全部结束！------');
});
