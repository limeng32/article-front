var $ = require('node').all;
var tpl = require('./home-view');
var selectTpl = require('./homeSelect-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var S = KISSY;
var Node = require('node');
var SP = require('../smartPath/smartPath');
var AI = require('../authIdentify/index');
var IO = require('io');
var UA = require('ua');
var AD = require('kg/agiledialog/1.0.2/index');
var JSONX = require('../jsonx/jsonx');
var PG = require('kg/pagination/2.0.0/index');
var TIP = require('kg/tooltip/2.2.0/index');
var DL = require('kg/droplist/2.0.1/index');
var CB = require('combobox');
var CBD = require('../callbackDialog/index');
module.exports = {
    init: function () {
        var ai = new AI(token);
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                account = JSONX.decode(account);
                IO.post(SP.resolvedIOPath('home/init?_content=json'), {status: 'p'}, function (d) {
                    d = JSONX.decode(d);
                    var page = d[0];
                    doInit(account, page);
                }, "json");
            });
        } else {
            IO.post(SP.resolvedIOPath('home/init?_content=json'), {status: 'p'}, function (d) {
                d = JSONX.decode(d);
                var page = d[0];
                doInit(null, page);
            }, "json");
        }
        var doInit = function (account, p) {
            var selectContainer = new Node('<div>').addClass('selectContainer');
            $('article').append(selectContainer);
            selectContainer.append(new XTemplate(selectTpl).render({}));
            var droplistDataSource = null;
            if (account == null) {
                droplistDataSource = [
                    {text: "首页推荐", value: 'gallery'},
                    {text: "全部文章", value: 'p'}
                ]
            } else {
                droplistDataSource = [
                    {text: "首页推荐", value: 'gallery'},
                    {text: "全部文章", value: 'p'},
                    {text: "我的草稿箱", value: 's'},
                    {text: "我的回收站", value: 'c'}
                ]
            }
            var droplist = new DL({
                // 设置初始化选择项。
                selectedItem: {
                    value: "p",
                    text: "全部文章"
                },
                srcNode: ".droplist",
                dataSource: droplistDataSource
            });
            droplist.render();
            var combo = new CB({
                dataSource: new CB.LocalDataSource({
                    data: []
                }),
                maxItemCount: 10,
                matchElWidth: true,
                //format: function (query, data) {
                //    var ret = [];
                //    for (var i = 0; i < data.length; i++) {
                //        ret[i] = {
                //            content: (data[i] + "")
                //                .replace(new RegExp(S.escapeRegExp(query), "g"),
                //                "<b>$&</b>"),
                //        };
                //    }
                //    return ret;
                //},
                srcNode: '.ks-combobox'
            })
            combo.render();
            var comboEl = combo.get('input');
            comboEl.on('keyup', function (e) {
                if (e.which == 38 || e.which == 40 || e.which == 27) {
                    return;
                }
                if (e.which == 13) {
                    searchButton.fire('click');
                    return;
                }
                if (comboEl[0].value == '') {
                    combo.__attrVals.dataSource = new CB.LocalDataSource({
                        data: []
                    });
                    combo.sendRequest('');
                    return;
                }
                IO.post(SP.resolvedIOPath('home/preSearchStory?_content=json'), {
                    q: comboEl[0].value,
                    status: droplist.getSelectedData().value
                }, function (d) {
                    d = JSONX.decode(d);
                    var dataSourceArray = new Array(d.length);
                    for (var i = 0; i < dataSourceArray.length; i++) {
                        dataSourceArray[i] = d[i].title;
                    }
                    combo.__attrVals.dataSource = new CB.LocalDataSource({
                        data: dataSourceArray
                    });
                    combo.sendRequest('');
                }, "json");
            });
            comboEl.on('focus', function (e) {
                if (comboEl[0].value == '') {
                    return;
                }
                IO.post(SP.resolvedIOPath('home/preSearchStory?_content=json'), {
                    q: comboEl[0].value,
                    status: droplist.getSelectedData().value
                }, function (d) {
                    d = JSONX.decode(d);
                    var dataSourceArray = new Array(d.length);
                    for (var i = 0; i < dataSourceArray.length; i++) {
                        dataSourceArray[i] = d[i].title;
                    }
                    combo.__attrVals.dataSource = new CB.LocalDataSource({
                        data: dataSourceArray
                    });
                    combo.sendRequest('');
                }, "json");
            });
            combo.on("click", function (e) {
                var item = e.target;
                //console.log(item.get("value") + "\n" + item.get("content") +
                //    "\n" + item.get('textContent'));
                comboEl.fire('blur');
                IO.post(SP.resolvedIOPath('home/get?_content=json'), {
                    q: item.get("textContent"),
                    status: droplist.getSelectedData().value
                }, function (d) {
                    d = JSONX.decode(d);
                    renderStorys(d);
                    reRenderPage(d);
                    //console.log(account);
                }, "json");
            });
            var searchButton = $('.searchButton');
            searchButton.unselectable();
            searchButton.on('click', function () {
                IO.post(SP.resolvedIOPath('home/get?_content=json'), {
                    q: comboEl[0].value,
                    status: droplist.getSelectedData().value
                }, function (d) {
                    d = JSONX.decode(d);
                    renderStorys(d);
                    reRenderPage(d);
                    //console.log(account);
                }, "json");
            });
            var storyContainer = new Node('<div>');
            $('article').append(storyContainer);
            var storyPaginationContainer = new Node('<div>').addClass('demo-con skin-tb storyPaginationContainer');
            $('article').append(storyPaginationContainer);
            var storyPagination = null;
            var renderPage = function (p) {
                storyPagination = new PG(storyPaginationContainer, {
                    currentPage: p.pageNo, // 默认选中第?页
                    totalPage: p.maxPageNum, // 一共有?页
                    firstPagesCount: 1, // 显示最前面的?页
                    preposePagesCount: 1, // 当前页的紧邻前置页为?页
                    postposePagesCount: 1, // 当前页的紧邻后置页为?页
                    lastPagesCount: 1, // 显示最后面的?页
                    render: true
                });
            }
            var reRenderPage = function (p) {
                storyPagination.__attrVals.currentPage = 1;
                storyPagination.__attrVals.totalPage = p.maxPageNum;
                storyPagination.renderUI();
            }
            var reRenderPage2 = function (p) {
                storyPagination.__attrVals.currentPage = p.pageNo;
                storyPagination.__attrVals.totalPage = p.maxPageNum > p.pageNo ? p.maxPageNum : p.pageNo;
                storyPagination.renderUI();
            }
            var renderStorys = function (p, account) {
                var xtpl = new XTemplate(tpl);
                var html;
                if (account == null) {
                    html = xtpl.render({
                        p: p,
                        SP: SP
                    });
                } else {
                    html = xtpl.render({
                        p: p,
                        SP: SP,
                        account: account
                    });
                }
                storyContainer.html(html);
                var tipDelete = new Node('<div>').addClass('bubble J_Tooltip').append(new Node('<span>').addClass('J_TooltipArrow arrow-top').append(new Node('<i>'))).append(new Node('<div>').addClass('tooltip-content')).hide();
                if (droplist.getSelectedData().value == 'p') {
                    tipDelete.one('.tooltip-content').html('移至回收站');
                } else if (droplist.getSelectedData().value == 's') {
                    tipDelete.one('.tooltip-content').html('移至回收站');
                } else if (droplist.getSelectedData().value == 'c') {
                    tipDelete.one('.tooltip-content').html('彻底删除');
                } else if (droplist.getSelectedData().value == 'gallery') {
                    tipDelete.one('.tooltip-content').html('不可用');
                }
                $('article').append(tipDelete);
                TIP.attach({
                    trigger: '.component-list .delete',      // 用于触发Tooltip出现的节点
                    refer: '.component-list .delete',          // 用于Tooltip进行位置计算的节点
                    tooltip: tipDelete,      // Tooltip节点
                    position: 'top'          // 可选：默认情况下，Tooltip会根据当前视域进行位置的计算，但是你也可以通过这个属性来强制Tooltip的显示位置，可用值：top,bottom,right,left
                });
                var tipPublish = new Node('<div>').addClass('bubble J_Tooltip').append(new Node('<span>').addClass('J_TooltipArrow arrow-top').append(new Node('<i>'))).append(new Node('<div>').addClass('tooltip-content')).hide();
                if (droplist.getSelectedData().value == 'p') {
                    tipPublish.one('.tooltip-content').html('取消发布');
                } else if (droplist.getSelectedData().value == 's') {
                    tipPublish.one('.tooltip-content').html('正式发布');
                } else if (droplist.getSelectedData().value == 'c') {
                    tipPublish.one('.tooltip-content').html('恢复为草稿');
                } else if (droplist.getSelectedData().value == 'gallery') {
                    tipDelete.one('.tooltip-content').html('不可用');
                }
                $('article').append(tipPublish);
                TIP.attach({
                    trigger: '.component-list .publish',      // 用于触发Tooltip出现的节点
                    refer: '.component-list .publish',          // 用于Tooltip进行位置计算的节点
                    tooltip: tipPublish,      // Tooltip节点
                    position: 'top'          // 可选：默认情况下，Tooltip会根据当前视域进行位置的计算，但是你也可以通过这个属性来强制Tooltip的显示位置，可用值：top,bottom,right,left
                });
                var tipEdit = new Node('<div>').addClass('bubble J_Tooltip').append(new Node('<span>').addClass('J_TooltipArrow arrow-top').append(new Node('<i>'))).append(new Node('<div>').addClass('tooltip-content').html('编辑文章')).hide();
                $('article').append(tipEdit);
                TIP.attach({
                    trigger: '.component-list .edit',      // 用于触发Tooltip出现的节点
                    refer: '.component-list .edit',          // 用于Tooltip进行位置计算的节点
                    tooltip: tipEdit,      // Tooltip节点
                    //arrowAlign: 'center',       // 可选：Tooltip的箭头和refer的位置关系: left,center,right
                    align: 'right',           // 可选：Tooltip主体和refer的位置关系
                    position: 'top'          // 可选：默认情况下，Tooltip会根据当前视域进行位置的计算，但是你也可以通过这个属性来强制Tooltip的显示位置，可用值：top,bottom,right,left
                });
                $('.component-list .delete').on('click', function (e) {
                    var id = new Node(e.target).attr('bind-data');
                    if (droplist.getSelectedData().value == 'p') {
                        new AD({
                            title: '温馨提示',
                            content: '您确定要将这篇文章移入回收站？',
                            onConfirm: function () {
                                new IO({
                                    type: 'POST',
                                    url: SP.resolvedIOPath('home/cancelStory?_content=json'),
                                    data: {id: id},
                                    success: function (d) {
                                        new CBD(d, refreshStory());
                                    }
                                });
                            },
                            onCancel: function () {
                            }
                        });
                    } else if (droplist.getSelectedData().value == 's') {
                        new AD({
                            title: '温馨提示',
                            content: '您确定要将这篇文章移入回收站？',
                            onConfirm: function () {
                                new IO({
                                    type: 'POST',
                                    url: SP.resolvedIOPath('home/cancelStory?_content=json'),
                                    data: {id: id},
                                    success: function (d) {
                                        new CBD(d, refreshStory());
                                    }
                                });
                            },
                            onCancel: function () {
                            }
                        });
                    } else if (droplist.getSelectedData().value == 'c') {
                        new AD({
                            title: '温馨提示',
                            content: '您确定要将这篇文章彻底删除？',
                            onConfirm: function () {
                            },
                            onCancel: function () {
                            }
                        });
                    } else if (droplist.getSelectedData().value == 'gallery') {
                        new AD({
                            type: 'alert',
                            content: '首页推荐期内此功能无法使用'
                        });
                    }
                });
                $('.component-list .publish').on('click', function (e) {
                    var id = new Node(e.target).attr('bind-data');
                    if (droplist.getSelectedData().value == 'p') {
                        new AD({
                            title: '温馨提示',
                            content: '您确定要将这篇文章取消发布，移入草稿箱？',
                            onConfirm: function () {
                            },
                            onCancel: function () {
                            }
                        });
                    } else if (droplist.getSelectedData().value == 's') {
                        new AD({
                            title: '温馨提示',
                            content: '您确定要将这篇文章发布？',
                            onConfirm: function () {
                            },
                            onCancel: function () {
                            }
                        });
                    } else if (droplist.getSelectedData().value == 'c') {
                        new AD({
                            title: '温馨提示',
                            content: '您确定要将这篇文章恢复为草稿状态？',
                            onConfirm: function () {
                            },
                            onCancel: function () {
                            }
                        });
                    } else if (droplist.getSelectedData().value == 'gallery') {
                        new AD({
                            type: 'alert',
                            content: '首页推荐期内此功能无法使用'
                        });
                    }
                });
            }
            renderPage(p);
            renderStorys(p, account);
            storyPagination.on('switch', function (e) {
                IO.post(SP.resolvedIOPath('home/get?_content=json'), {
                    pageNo: e.toPage,
                    q: comboEl[0].value,
                    status: droplist.getSelectedData().value
                }, function (d) {
                    d = JSONX.decode(d);
                    renderStorys(d, account);
                    reRenderPage2(d);
                }, "json");
            });
            droplist.on('change', function (ev) {
                IO.post(SP.resolvedIOPath('home/get?_content=json'), {
                    pageNo: 1,
                    q: comboEl[0].value,
                    status: droplist.getSelectedData().value
                }, function (d) {
                    d = JSONX.decode(d);
                    renderStorys(d, account);
                    reRenderPage(d);
                }, "json");
            });
            var refreshStory = function () {
                //console.log()
                IO.post(SP.resolvedIOPath('home/get?_content=json'), {
                    pageNo: storyPagination.__attrVals.currentPage,
                    q: comboEl[0].value,
                    status: droplist.getSelectedData().value
                }, function (d) {
                    d = JSONX.decode(d);
                    renderStorys(d, account);
                    reRenderPage2(d);
                }, "json");
            }
        }
    }
}