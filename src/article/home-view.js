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


buffer.data += '<p>\n<table class="storyList">\n    <tr>\n        <td class="storyList-title-td">\n            <a class="storyList-title-td-a" href="';
pos.line = 5;
var exp1 = 'readStory/';
var id0 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[0].id:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[0]) != null?(t1.id):t1):t0) :scope.resolveLooseUp(["p","pageItems",0,"id"])));
exp1 = ('readStory/')+(id0);
var callRet2
callRet2 = callFnUtil(tpl, scope, {escape:1,params:[exp1]}, buffer, ["SP","resolvedPath"]);
buffer = buffer.writeEscaped(callRet2);
buffer.data += '" target="_blank">';
var id3 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[0].title:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[0]) != null?(t1.title):t1):t0) :scope.resolveLooseUp(["p","pageItems",0,"title"])));
buffer = buffer.writeEscaped(id3);
buffer.data += '</a>\n        </td>\n        <td class="storyList-writer-td">';
pos.line = 7;
var id4 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[0].account.name:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[0]) != null?((t2=t1.account) != null?(t2.name):t2):t1):t0) :scope.resolveLooseUp(["p","pageItems",0,"account","name"])));
buffer = buffer.writeEscaped(id4);
buffer.data += '</td>\n        <td class="storyList-ct-td">';
pos.line = 8;
var id5 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[0].createTime:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[0]) != null?(t1.createTime):t1):t0) :scope.resolveLooseUp(["p","pageItems",0,"createTime"])));
buffer = buffer.writeEscaped(id5);
buffer.data += '</td>\n    </tr>\n    <tr>\n        <td class="storyList-title-td"><a href="';
pos.line = 11;
var exp7 = 'readStory/';
var id6 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[1].id:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[1]) != null?(t1.id):t1):t0) :scope.resolveLooseUp(["p","pageItems",1,"id"])));
exp7 = ('readStory/')+(id6);
var callRet8
callRet8 = callFnUtil(tpl, scope, {escape:1,params:[exp7]}, buffer, ["SP","resolvedPath"]);
buffer = buffer.writeEscaped(callRet8);
buffer.data += '" target="_blank">';
var id9 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[1].title:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[1]) != null?(t1.title):t1):t0) :scope.resolveLooseUp(["p","pageItems",1,"title"])));
buffer = buffer.writeEscaped(id9);
buffer.data += '</a></td>\n        <td class="storyList-writer-td">';
pos.line = 12;
var id10 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[1].account.name:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[1]) != null?((t2=t1.account) != null?(t2.name):t2):t1):t0) :scope.resolveLooseUp(["p","pageItems",1,"account","name"])));
buffer = buffer.writeEscaped(id10);
buffer.data += '</td>\n        <td class="storyList-ct-td">';
pos.line = 13;
var id11 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[1].createTime:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[1]) != null?(t1.createTime):t1):t0) :scope.resolveLooseUp(["p","pageItems",1,"createTime"])));
buffer = buffer.writeEscaped(id11);
buffer.data += '</td>\n    </tr>\n    <tr>\n        <td class="storyList-title-td"><a href="';
pos.line = 16;
var exp13 = 'readStory/';
var id12 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[2].id:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[2]) != null?(t1.id):t1):t0) :scope.resolveLooseUp(["p","pageItems",2,"id"])));
exp13 = ('readStory/')+(id12);
var callRet14
callRet14 = callFnUtil(tpl, scope, {escape:1,params:[exp13]}, buffer, ["SP","resolvedPath"]);
buffer = buffer.writeEscaped(callRet14);
buffer.data += '" target="_blank">';
var id15 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[2].title:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[2]) != null?(t1.title):t1):t0) :scope.resolveLooseUp(["p","pageItems",2,"title"])));
buffer = buffer.writeEscaped(id15);
buffer.data += '</a></td>\n        <td class="storyList-writer-td">';
pos.line = 17;
var id16 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[2].account.name:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[2]) != null?((t2=t1.account) != null?(t2.name):t2):t1):t0) :scope.resolveLooseUp(["p","pageItems",2,"account","name"])));
buffer = buffer.writeEscaped(id16);
buffer.data += '</td>\n        <td class="storyList-ct-td">';
pos.line = 18;
var id17 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[2].createTime:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[2]) != null?(t1.createTime):t1):t0) :scope.resolveLooseUp(["p","pageItems",2,"createTime"])));
buffer = buffer.writeEscaped(id17);
buffer.data += '</td>\n    </tr>\n    <tr>\n        <td class="storyList-title-td"><a href="';
pos.line = 21;
var exp19 = 'readStory/';
var id18 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[3].id:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[3]) != null?(t1.id):t1):t0) :scope.resolveLooseUp(["p","pageItems",3,"id"])));
exp19 = ('readStory/')+(id18);
var callRet20
callRet20 = callFnUtil(tpl, scope, {escape:1,params:[exp19]}, buffer, ["SP","resolvedPath"]);
buffer = buffer.writeEscaped(callRet20);
buffer.data += '" target="_blank">';
var id21 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[3].title:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[3]) != null?(t1.title):t1):t0) :scope.resolveLooseUp(["p","pageItems",3,"title"])));
buffer = buffer.writeEscaped(id21);
buffer.data += '</a></td>\n        <td class="storyList-writer-td">';
pos.line = 22;
var id22 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[3].account.name:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[3]) != null?((t2=t1.account) != null?(t2.name):t2):t1):t0) :scope.resolveLooseUp(["p","pageItems",3,"account","name"])));
buffer = buffer.writeEscaped(id22);
buffer.data += '</td>\n        <td class="storyList-ct-td">';
pos.line = 23;
var id23 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[3].createTime:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[3]) != null?(t1.createTime):t1):t0) :scope.resolveLooseUp(["p","pageItems",3,"createTime"])));
buffer = buffer.writeEscaped(id23);
buffer.data += '</td>\n    </tr>\n    <tr>\n        <td class="storyList-title-td"><a href="';
pos.line = 26;
var exp25 = 'readStory/';
var id24 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[4].id:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[4]) != null?(t1.id):t1):t0) :scope.resolveLooseUp(["p","pageItems",4,"id"])));
exp25 = ('readStory/')+(id24);
var callRet26
callRet26 = callFnUtil(tpl, scope, {escape:1,params:[exp25]}, buffer, ["SP","resolvedPath"]);
buffer = buffer.writeEscaped(callRet26);
buffer.data += '" target="_blank">';
var id27 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[4].title:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[4]) != null?(t1.title):t1):t0) :scope.resolveLooseUp(["p","pageItems",4,"title"])));
buffer = buffer.writeEscaped(id27);
buffer.data += '</a></td>\n        <td class="storyList-writer-td">';
pos.line = 27;
var id28 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[4].account.name:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[4]) != null?((t2=t1.account) != null?(t2.name):t2):t1):t0) :scope.resolveLooseUp(["p","pageItems",4,"account","name"])));
buffer = buffer.writeEscaped(id28);
buffer.data += '</td>\n        <td class="storyList-ct-td">';
pos.line = 28;
var id29 = ((t=(affix.p)) !== undefined ? affix.p.pageItems[4].createTime:((t = data.p) !== undefined ? ((t0=t.pageItems) != null?((t1=t0[4]) != null?(t1.createTime):t1):t0) :scope.resolveLooseUp(["p","pageItems",4,"createTime"])));
buffer = buffer.writeEscaped(id29);
buffer.data += '</td>\n    </tr>\n</table>\n</p>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});