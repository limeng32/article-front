KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function homeSelectView(undefined){
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


buffer.data += '<h2 class="h2"><span class="iconfont">&#xe601;</span><span class="J_Floor">故事列表</span></h2>\n<span class="droplist">\n    <div class="drop-trigger"><i class="caret"></i></div>\n    <div class="drop-wrap">\n        <input type="text" class="drop-text"/>\n    </div>\n    <input type="hidden" class="drop-value"/>\n</span>\n<span class="ks-combobox" id="combobox">\n    <div class="ks-combobox-input-wrap">\n        <input style="width:500px;height:100%;" aria-haspopup="true"\n               aria-combobox="list" role="combobox" combobox="off"\n               class="ks-combobox-input" tabindex="0"\n               id="inp" placeholder=" 多个关键字可用空格分隔"\n                />\n    </div>\n</span><span class="ks-button searchButton">搜索<img class="searchIcon"\n                                                   src="http://mirage-limeng32.oss-cn-qingdao.aliyuncs.com/system/search.png"></span>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});