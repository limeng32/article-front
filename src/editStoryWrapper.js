KISSY.use('article-front/editStoryWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/editStoryHeader');
    header.init();

//初始化article模块
    var article = require('./article/editStory');
    article.init();
});