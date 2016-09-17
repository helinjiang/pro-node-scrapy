# pro-node-scrapy
本项目是使用 Node.js 来做网络爬虫，尝试各种方案，部分方案可能参考了其他人的代码，仅供学习之用。

## 目标
使用 Node.js 做网络爬虫，社区也有一些方案，本项目以爬取 GitHub 中部分仓库的部分信息为例，探讨各种实现的方式。

> 请注意，仅限于学习的目的，如若布置到生产环境中，则需自行评估。

每个目标页面输出 JSON 格式的数据，例如：

```
{
    "url": "https://github.com/facebook/react",
    "repo": "https://github.com/facebook/react.git",
    "author": "facebook",
    "stats": {
        "commits": "7200",
        "branches": "24",
        "releases": "50",
        "contributors": "782",
        "social": {
            "stars": "49066",
            "forks": "8685"
        }
    },
    "_scrapy": {
        "t": 1473904953317,
        "cost": 2321,
        "status": 200
    }
}
```

> 各个项目是独立的，如要测试，请 `cd` 到相应的子目录中。
