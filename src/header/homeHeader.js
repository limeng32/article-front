var $ = require('node').all;
var Node = require('node');
var IO = require('io');
var SP = require('core-front/smartPath/smartPath');
var AI = require('core-front/authIdentify/index');
var JSONX = require('core-front/jsonx/jsonx');
module.exports = {
    init: function () {
        var ai = new AI(token);
        var headerMain = new Node('<div>').addClass('headerMain');
        var headerTail = new Node('<div>').addClass('headerTail');
        $('header').append(headerMain).append(headerTail);
        if (ai.existChecked()) {
            var signOutButton = new Node('<input>').prop({
                type: 'submit',
                value: '退出'
            }).addClass('ks-button ks-button-warning ks-button-shown signButton');
            var writeStoryButton = new Node('<input>').prop({
                type: 'submit',
                value: '开始创作'
            }).addClass('ks-button ks-button-info ks-button-shown signButton');
            var portraitButton = new Node('<input>').prop({
                type: 'submit',
                value: '编辑头像'
            }).addClass('ks-button ks-button-success ks-button-shown signButton');
            headerTail.append(portraitButton).append(writeStoryButton).append(signOutButton);
            writeStoryButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('writeStory'));
            });
            signOutButton.on('click', function (e) {
                IO.post(SP.resolvedIOPath('signOut?_content=json'), {}, function (data) {
                    if (data) {
                        window.location.assign(SP.resolvedPath('.'));
                    }
                }, 'json');
            });
            portraitButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('editUser'));
            });
        } else {
            headerMain.html('您好，欢迎来到海市蜃楼');
            var signUpButton = new Node('<input>').prop({
                type: 'submit',
                value: '注册'
            }).addClass('ks-button ks-button-primary ks-button-shown signButton');
            var signInButton = new Node('<input>').prop({
                type: 'submit',
                value: '登录'
            }).addClass('ks-button ks-button-shown signButton');
            headerTail.append(signUpButton).append(signInButton);
            signUpButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('signUp'));
            });
            signInButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('signIn'));
            });
        }
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                headerMain.html(account.name + '您好，欢迎来到海市蜃楼。');
            });
        }
    }
}