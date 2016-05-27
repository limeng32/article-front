KISSY.add('callbackDialog', ['kg/agiledialog/1.0.2/index'], function (S, require, exports, module) {
    var AD = require('kg/agiledialog/1.0.2/index');
    module.exports = function (d, f1, f2) {
        if (d != null && d.flag != null) {
            if (d.flag) {
                if (f1 != null) {
                    f1(d);
                }
            } else {
                if (f2 != null) {
                    f2(d);
                }
            }
            if (d.message != null) {
                new AD({
                    type: 'alert',
                    content: d.message
                });
            }
        }
    }
});