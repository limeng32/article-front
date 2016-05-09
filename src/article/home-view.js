KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function homeView(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];


buffer.data += '<p>\n<div class="component kissy-ui" style="margin-left: 5px">\n    <!--\n            <h2>kissy 共有优秀组件 <strong id="J_ComponentCount">*</strong> 个</h2>\n    -->\n\n    <div id="combobox" class="search-combobox">\n        <div class="search-combobox-input-wrap">\n            <input id="q" name="q" type="text" placeholder="纯优秀组件，你值得搜索" autocomplete="off" autofocus="autofocus"\n                   class="search-combobox-input"></div>\n    </div>\n    <h2 class="h2"><span class="iconfont">&#xe601;</span><span class="J_Floor">kissy ui</span></h2>\n\n    <p class="explain"><span class="iconfont">&#xe600;</span><span>kissy ui 由kissy小组维护的精品ui组件集</span></p>\n    <ul id="J_KISSYUI" class="component-list" style="width: 1220px">\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n        <li class="item">\n            <div class="desc">\n                <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank">\n                    <img src="http://gtms01.alicdn.com/tps/i1/TB165MfGVXXXXcuXXXXifb32pXX-220-160.png">\n\n                    <p>弹出层和对话框组件</p>\n                </a>\n            </div>\n            <a href="/1.4/docs/html/api/overlay/overlay.html" target="_blank" class="item-link">\n                <h4 class="name l-block">overlay</h4>\n            </a>\n        </li>\n    </ul>\n</div>\n</p>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});