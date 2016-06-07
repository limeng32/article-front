var $ = require('node').all;
var Node = require('node');
var IO = require('io');
var SP = require('../smartPath/smartPath');
var AI = require('../authIdentify/index');
var JSONX = require('../jsonx/jsonx');
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
            var homeButton = new Node('<input>').prop({
                type: 'submit',
                value: '回到首页'
            }).addClass('ks-button ks-button-info ks-button-shown signButton');
            headerTail.append(homeButton).append(signOutButton);
            signOutButton.on('click', function (e) {
                IO.post(SP.resolvedIOPath('signOut?_content=json'), {}, function (data) {
                    if (data) {
                        window.location.assign(SP.resolvedPath('.'));
                    }
                }, 'json');
            });
            homeButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('home'));
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
            var homeButton = new Node('<input>').prop({
                type: 'submit',
                value: '进来看看'
            }).addClass('ks-button ks-button-info ks-button-shown signButton');
            headerTail.append(signUpButton).append(signInButton).append(homeButton);
            signUpButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('signUp'));
            });
            signInButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('signIn'));
            });
            homeButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('home'));
            });
        }
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                headerMain.html(account.name + '您好，欢迎来到海市蜃楼。');
            });
        }
    }
}