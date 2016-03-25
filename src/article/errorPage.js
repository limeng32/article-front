var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var IO = require('io');
module.exports = {
    init: function () {
        var mainDiv = new Node('<div>').addClass('articleMiddle');
        $('article').append(mainDiv);
        if (reason == '') {
            reason = '您遇到了一个未知问题，请联系管理员';
        }
        mainDiv.html(reason);
    }
}