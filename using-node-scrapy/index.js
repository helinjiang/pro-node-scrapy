var scrapy = require('node-scrapy'),
    url = 'https://github.com/strongloop/express',
    model = {
        author: '.author',
        // repo: '.js-url-field',
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

var obj={};

function go(url){
    obj[url]={};
    obj[url].t1 = +new Date();
    scrapy.scrape(url, model, function (err, data) {
        obj[url].t2 = +new Date();
        console.log('cost ', obj[url].t2 - obj[url].t1, obj[url]);
        if (err) {
            console.error(JSON.stringify(err));
            console.error(err.message);

            return console.error(err);
        }
        console.log(data);
        console.log(JSON.stringify(data));
    });
}
console.log('begin ', +new Date())
// go('https://github.com/strongloop/express');
go('https://github.com/facebook/react');
// go('https://github.com/facebook/nuclide');
// go('https://github.com/facebook/jest');
// go('https://github.com/facebook/buck');
// go('http://www.bttiantang.com/subject/28496.html');