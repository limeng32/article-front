KISSY.use('article-front/readStoryWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/readStoryHeader');
    header.init();

//初始化article模块
    var article = require('./article/readStory');
    article.init();
});