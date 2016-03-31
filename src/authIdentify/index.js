KISSY.add('authIdentify', [], function (S, require, exports, module) {
    exports.lowLevelChecked = function (authToken) {
        return authToken != null && authToken >= 2 ? true : false;
    };
    exports.middleLevelChecked = function (authToken) {
        return authToken != null && authToken >= 5 ? true : false;
    };
    exports.highLevelChecked = function (authToken) {
        return authToken != null && authToken >= 8 ? true : false;
    };
});