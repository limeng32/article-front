var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var S = KISSY;
var Node = require('node');
var SP = require('../smartPath/smartPath');
var JSONX = require('../jsonx/jsonx');
var IO = require('io');
module.exports = {
    init: function () {
        var editorContainer = new Node('<div>').addClass('editorContainer');
        var titleContainer = new Node('<div').addClass('titleContainer');
        var titleNode = new Node('<span>').addClass('titleNode').addClass('titleText2');
        var titleText = new Node('<span>').html('标题：').addClass('titleText2');
        titleContainer.append(titleText).append(titleNode);
        var writerContainer = new Node('<div>').addClass('writerContainer');
        $('article').append(titleContainer).append(writerContainer).append(editorContainer);
        IO.post(SP.resolvedIOPath('readStory/get?_content=json'), {storyId: storyId}, function (d) {
            d = JSONX.decode(d);
            if (d.account != null) {
                writerContainer.append('作者：').append(d.account.name).append('&nbsp;&nbsp;');
                writerContainer.append('创作于：').append(d.createTime);
            }
            titleNode.append(d.title);
            editorContainer.append(d.content);
        }, "json");
    }
}