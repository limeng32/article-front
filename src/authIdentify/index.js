KISSY.add('authIdentify', ['io', '../smartPath/smartPath', '../jsonx/jsonx'], function (S, require, exports, module) {
    var IO = require('io');
    var JSONX = require('../jsonx/jsonx');
    module.exports = function (t, v, f) {
        this.account = null;
        this.tokenExist = false;
        this.token;
        if (t != null && t != '') {
            this.token = t;
            this.tokenExist = true;
        }
        this.existChecked = function () {
            return this.tokenExist;
        };
        this.acquireAccount = function (url, f, id) {
            if (id == null) {
                id = this.token;
            }
            IO.post(url, {id: id}, function (data) {
                f(JSONX.decode(data));
            }, 'json');
        }
    }
});