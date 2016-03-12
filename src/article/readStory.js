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
        var submitForm = new Node('<form>').prop({
            action: SP.resolvedPath('writeStory/submitNew'),
            method: 'post'
        });
        var editorContainer = new Node('<div>');
        var submitButton = new Node('<input>').prop({
            type: 'button',
            value: '发表'
        });
        $('article').append(editorContainer).append(submitForm).append(submitButton);
        IO.post(SP.resolvedIOPath('readStory/get?_content=json'), function (d) {
            d = JSONX.decode(d);
            $('article').append(d.content);
        }, "json");
    }
}