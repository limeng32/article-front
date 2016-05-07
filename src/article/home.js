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
        IO.post(SP.resolvedIOPath('home/get?_content=json'), {}, function (d) {
            d = JSONX.decode(d);
            dealStory(d);
        }, "json");
        var dealStory = function (p) {
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
                    SP: SP
                });
                storyContainer.html(html);
                var tipN = new Node('<div>').addClass('bubble J_Tooltip');
                var tipSpan = new Node('<span>').addClass('J_TooltipArrow arrow-top');
                tipSpan.append(new Node('<i>'));
                var tipContent = new Node('<div>').addClass('tooltip-content');
                tipContent.html('这是tips');
                tipN.append(tipSpan).append(tipContent);
                tipN.hide();
                $('article').append(tipN);
                TIP.attach({
                    trigger: '.storyList-title-td-a',      // 用于触发Tooltip出现的节点
                    refer: '.storyList-title-td-a',          // 用于Tooltip进行位置计算的节点
                    tooltip: tipN,      // Tooltip节点
                    // ------------ 以下参数可选 ------------------------------
                    position: 'right'          // 可选：默认情况下，Tooltip会根据当前视域进行位置的计算，但是你也可以通过这个属性来强制Tooltip的显示位置，可用值：top,bottom,right,left
                    //arrowAlign: 'center',       // 可选：Tooltip的箭头和refer的位置关系: left,center,right
                    //align: 'center'           // 可选：Tooltip主体和refer的位置关系
                });
            }
            renderStorys(p);
        }
    }
}