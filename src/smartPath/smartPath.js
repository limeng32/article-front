KISSY.add('smartPath', ['path'], function (S, require, exports, module) {
    var Path = require('path');
    var _relativeIOPath = function () {
        var pathname = window.location.pathname;
        var normalPath = Path.normalize(pathname);
        var count = normalPath.split("/").length - 1;
        var ret = '';
        for (var i = 3; i <= count; i++) {
            ret += '../';
        }
        return ret;
    }
    var _relativePath = function () {
        var pathname = window.location.pathname;
        var pathTail = '/';
        while (KISSY.endsWith(pathname, '//')) {
            pathname = pathname.substring(0, pathname.length - 1);
            pathTail += "/";
        }
        if (pathTail.length > 0) {
            pathTail = pathTail.substring(0, pathTail.length - 1);
        }
        var normalPath = Path.normalize(pathname) + pathTail;
        var count = normalPath.split("/").length - 1;
        var ret = '';
        for (var i = 3; i <= count; i++) {
            ret += '../';
        }
        return ret;
    }
    exports.pathname = function () {
        return window.location.pathname;
    };
    exports.relativePath = function () {
        return _relativePath();
    };
    exports.resolvedIOPath = function (url) {
        return Path.normalize(_relativeIOPath() + url);
    };
    exports.resolvedPath = function (url) {
        return Path.normalize(_relativePath() + url);
    };
});