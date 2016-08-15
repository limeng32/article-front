KISSY.use('article-front/errorPageWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/writeStoryHeader');
    header.init();

//初始化article模块
    var article = require('./article/errorPage');
    article.init();
});