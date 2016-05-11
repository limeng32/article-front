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


buffer.data += '<p class="explain">\n    <select name="service-type" id="J_ServiceType" class="select">\n        <option value="0">仅退款<span>（不退货）</span></option>\n        <option value="1">退货退款</option>\n        <option value="2">换货</option>\n        <option value="3">维修</option>\n        <option value="4">补寄1</option>\n    </select>\n</p>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});