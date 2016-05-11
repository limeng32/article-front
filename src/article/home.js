var $ = require('node').all;
var tpl = require('./home-view');
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
module.exports = {
    init: function () {
        var ai = new AI(token);
        IO.post(SP.resolvedIOPath('home/get?_content=json'), {}, function (d) {
            d = JSONX.decode(d);
            if (ai.existChecked()) {
                ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                    dealStory(d, account);
                });
            } else {
                dealStory(d);
            }
        }, "json");
        var dealStory = function (p, account) {
            var storyContainer = new Node('<div>');
            $('article').append(storyContainer);
            var storyPaginationContainer = new Node('<div>').addClass('demo-con skin-tb storyPaginationContainer');
            $('article').append(storyPaginationContainer);
            var storyPagination = new PG(storyPaginationContainer, {
                currentPage: p.pageNo, // 默认选中第7页
                totalPage: p.maxPageNum, // 一共有12页
                firstPagesCount: 1, // 显示最前面的2页
                preposePagesCount: 1, // 当前页的紧邻前置页为1页
                postposePagesCount: 1, // 当前页的紧邻后置页为2页
                lastPagesCount: 1 // 显示最后面的1页
            });
            storyPagination.on('switch', function (e) {
                IO.post(SP.resolvedIOPath('home/get?_content=json'), {pageNo: e.toPage}, function (d) {
                    d = JSONX.decode(d);
                    renderStorys(d);
                }, "json");
            });
            var renderStorys = function (p) {
                var html = new XTemplate(tpl).render({
                    p: p,
                    SP: SP,
                    account: account
                });
                storyContainer.html(html);
                var tipDelete = new Node('<div>').addClass('bubble J_Tooltip').append(new Node('<span>').addClass('J_TooltipArrow arrow-top').append(new Node('<i>'))).append(new Node('<div>').addClass('tooltip-content').html('删除文章')).hide();
                $('article').append(tipDelete);
                TIP.attach({
                    trigger: '.component-list .delete',      // 用于触发Tooltip出现的节点
                    refer: '.component-list .delete',          // 用于Tooltip进行位置计算的节点
                    tooltip: tipDelete,      // Tooltip节点
                    position: 'top'          // 可选：默认情况下，Tooltip会根据当前视域进行位置的计算，但是你也可以通过这个属性来强制Tooltip的显示位置，可用值：top,bottom,right,left
                });
                var tipPublish = new Node('<div>').addClass('bubble J_Tooltip').append(new Node('<span>').addClass('J_TooltipArrow arrow-top').append(new Node('<i>'))).append(new Node('<div>').addClass('tooltip-content').html('发布/取消')).hide();
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
                    new AD({
                        title: '温馨提示',
                        content: '您确定要删除这篇文章？',
                        onConfirm: function () {
                            alert('删除' + id);
                        },
                        onCancel: function () {
                        }
                    });
                });
                $('.component-list .publish').on('click', function (e) {
                    var id = new Node(e.target).attr('bind-data');
                    new AD({
                        title: '温馨提示',
                        content: '您确定要取消这篇文章的发布状态？',
                        onConfirm: function () {
                            alert('取消' + id);
                        },
                        onCancel: function () {
                        }
                    });
                });
            }
            renderStorys(p);
        }
    }
}