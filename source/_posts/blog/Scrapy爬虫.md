---
title: Scrapy爬虫
date: 2023-07-23 15:54:11
updated: 2023-07-23 15:54:11
tags:
---

# Scrapy 爬取静态HTML页面
### 第一次写个人Blog,作为学习生涯的一点小小记录，也是不断摸索前进的一点慰藉。
<!-- 注意在符号与内容之间的空格，不加空格会认为都是文本内容 -->

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<style type ="text/css">
	.prettyprint {
    margin: 0 0 24px;
    padding: 8px 16px 6px 56px;
    background-color: #f6f8fa;
    border: none;
	position: relative;
    overflow-y: hidden;
    overflow-x: auto;
}
	pre {
    position: relative;
	font-family: Consolas,Inconsolata,Courier,monospace;
    font-size: 14px;
    line-height: 22px;
    color: #000;
}	
.prettyprint .pre-numbering {
    position: absolute;
    width: 48px;
    background-color: #eef0f4;
    top: 0;
    left: 0;
    margin: 0;
    padding: 8px 0;
    list-style: none;
    text-align: center;
}
	</style>
</head>


Upadate 8.29
[css选择器(Selectors) 用法](https://blog.csdn.net/dangsh_/article/details/78617178)

<ol><li>#container 选择id为container的元素</li><li>.container 选择所有class包含container的元素</li><li>* 选择所有元素</li><li>div a 选取所有div下所有a元素</li><li>ul + p 选取ul后面的第一个p元素</li><li>ul ~p 选取与ul相邻的所有p元素</li><li>a:nth-child(2) 选取下面第二个标签，如果是a的话则选取，不是则不取</li><li>a:nth-child(2n) 选取第偶数个a元素</li><li>a:nth-child(2n+1) 选取第奇数个a元素</li><li>li.multi-chosen &gt; a 选取class为multi-chosen的li的所有a元素</li><li>a[title] 选取所有拥有title属性的a元素</li><li>a[href=”https://www.lagou.com/jobs/3537439.html”] 选取所有href属性为<a href="https://www.lagou.com/jobs/3537439.html" target="_blank" rel="noopener noreferrer">https://www.lagou.com/jobs/3537439.html</a>的a元素</li><li>a[href*=”www.lagou.com”] 选取所有href属性值中包含www.lagou.com的a元素</li><li>a[href^=”http”] 选取所有href属性值中以http开头的a元素</li><li>div:not(#content-container) 选取所有id为非content-container 的div</li></ol>


```
import scrapy
from First.items import FirstItem

class Lagou(scrapy.Spider):
    name = "forth"
    start_urls = [
        "https://www.lagou.com/zhaopin/Java/"
    ]


    def parse(self , response):
        pass
```
```
    def parse(self , response):
        for item in response.css('#lg_tnav h1'):
            jobMessage = item.css('::text').extract()
            print(jobMessage)
```

### 参考 笔记暂未写
[scrapy爬取script标签中某个var变量的值](https://blog.csdn.net/printf123scanf/article/details/105911511?ydreferer=aHR0cHM6Ly9jbi5iaW5nLmNvbS8%3D?ydreferer=aHR0cHM6Ly9jbi5iaW5nLmNvbS8%3D?ydreferer=aHR0cHM6Ly9jbi5iaW5nLmNvbS8%3D?ydreferer=aHR0cHM6Ly9jbi5iaW5nLmNvbS8%3D)
[Python中使用正则表达式获取两个字符中间部分](https://www.cnblogs.com/syq816/p/12612263.html)
[Bilibili用户爬虫](https://github.com/airingursb/bilibili-user)
[这才是B站爬虫的正确姿势，视频、评论、弹幕全部拿下](https://zhuanlan.zhihu.com/p/357392015)
[【python爬虫实战】：不同验证码的自动识别](https://blog.csdn.net/Java_ZZZZZ/article/details/131630415)
[爬虫之模拟登录、自动获取cookie值、验证码识别](https://blog.csdn.net/gets_s/article/details/115839687)
[python爬虫解决手机验证码问题 ](https://www.cnblogs.com/angelyan/p/12207835.html#:~:text=1.%E6%89%93%E5%BC%80tasker%E7%95%8C%E9%9D%A2%EF%BC%8C%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8B%E5%8A%A0%E5%8F%B7%202.%E7%82%B9%E5%87%BB%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B%EF%BC%8C%E9%80%89%E6%8B%A9%E4%BA%8B%E4%BB%B6,3.%E9%80%89%E6%8B%A9%E4%BA%8B%E4%BB%B6%E7%B1%BB%E5%9E%8B%EF%BC%8C%E7%82%B9%E5%87%BB%E7%94%B5%E8%AF%9D%204.%E7%82%B9%E5%87%BB%E6%94%B6%E5%88%B0%E7%9F%AD%E4%BF%A1%205.%E5%9C%A8%E5%8F%91%E4%BB%B6%E4%BA%BA%E5%92%8C%E5%86%85%E5%AE%B9%E4%B8%AD%E5%A1%AB%E5%86%99%E8%BF%87%E6%BB%A4%E6%9D%A1%E4%BB%B6%EF%BC%8C%E6%AF%94%E5%A6%82%EF%BC%9A10086%E5%8F%91%E6%9D%A5%E7%9A%84%EF%BC%8C%E5%86%85%E5%AE%B9%E6%98%AF%E9%AA%8C%E8%AF%81%E7%A0%81%EF%BC%8C%E7%84%B6%E5%90%8E%E7%9B%B4%E6%8E%A5%E7%82%B9%E5%87%BB%E5%B7%A6%E4%B8%8A%E8%A7%92%E7%9A%84%E8%BF%94%E5%9B%9E%E6%8C%89%E9%92%AE%E8%87%AA%E5%8A%A8%E4%BF%9D%E5%AD%98)
[网络爬虫|网页中嵌套iframe框架内容爬取的两种思路](https://zhuanlan.zhihu.com/p/154055263)
[爬虫---scrapy爬虫框架（详细+实战）](https://blog.csdn.net/lihaian/article/details/126104447)
[浅谈Python两大爬虫库——urllib库和requests库区别](https://cloud.tencent.com/developer/article/1826626)
[urllib.request详细介绍](https://blog.csdn.net/qq_43546676/article/details/88777227)
[pandas read_html使用详解（一）](https://www.cnblogs.com/litufu/articles/8721207.html)
[js爬虫，正则](https://cloud.tencent.com/developer/article/1559913?from=15425)
[go语言模拟网站登录并爬虫](https://blog.csdn.net/yang731227/article/details/83900422)
[python爬虫的重定向问题](https://cloud.tencent.com/developer/article/1406499?from=15425)
[爬虫——控制台抓包和requests.post()发送请求](https://www.cnblogs.com/LXP-Never/p/11382216.html)
[python ：codecs模块简介](https://blog.csdn.net/qq_28072715/article/details/79387422)
[嵌入的iframe](https://juejin.cn/post/6991828558096105485)
[Python爬取javascript(js)动态网页](https://www.cnblogs.com/taolusi/p/9282565.html)
[python3（urlopen）获取网页的坑](https://blog.csdn.net/qq_32623363/article/details/78768636)
[正则表达式-如何简单匹配HTML中a标签的href](https://juejin.cn/post/7135036717966786573)
[正则表达式匹配指定字符串中间内容](https://blog.csdn.net/weixin_43452467/article/details/113884408)
[python+selenium四：iframe查看、定位、切换](https://www.cnblogs.com/zhongyehai/p/9170366.html)