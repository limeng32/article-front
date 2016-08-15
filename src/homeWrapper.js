KISSY.use('article-front/homeWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/homeHeader');
    header.init();

//初始化article模块
    var article = require('./article/home');
    article.init();
});