var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Editor = require('editor');
var S = KISSY;
var Node = require('node');
module.exports = {
    init:function(){
        S.log('article init');
        var html = new XTemplate(tpl).render({
            title:'this is writeStory3',
            content:'render by kg/xtemplate'
        });
        var editorContainer = new Node('<div>');
        var editorNode = new Node('<textarea>');
        $('article').append(editorContainer.append(editorNode));
        var cfg ={
            fromTextarea:editorNode,
            focused: true,
            attachForm: true,
            baseZIndex: 10000
            // customStyle:"p{line-height: 1.4;margin: 1.12em 0;padding: 0;}",
            // customLink:["http://localhost/customLink.css","http://xx.com/y2.css"],
        };
        var plugins = ("source-area" +
        ",code" +
        ",separator" +
        ",bold" +
        ",italic," +
        "font-family," +
        "font-size," +
        "strike-through," +
        "underline," +
        "separator," +
        "checkbox-source-area" +
        ",image" +
        ",link" +
        ",fore-color" +
        ",back-color" +
        ",resize" +
        ",draft" +
        ",undo" +
        ",indent" +
        ",outdent" +
        ",unordered-list" +
        ",ordered-list" +
        ",element-path" +
        ",page-break" +
        ",preview" +
        ",maximize" +
        ",remove-format" +
        ",heading" +
        ",justify-left" +
        ",justify-center" +
        ",justify-right" +
        ",table" +
        ",smiley" +
        ",drag-upload").split(",");

        var fullPlugins = [];

        S.each(plugins, function (p, i) {
            fullPlugins[i] = "editor/plugin/" + p;
        });

        var pluginConfig = {
            link: {
                target: "_blank"
            },
            "image": {
                defaultMargin: 0,
                //remote:false,
                upload: {
                    serverUrl: window.UPLOAD_SINGLE_URL || "upload.jss",
                    serverParams: {
                        waterMark: function () {
                            return S.one("#ke_img_up_watermark_1")[0].checked;
                        }
                    },
                    suffix: "png,jpg,jpeg,gif",
                    fileInput: "Filedata",
                    sizeLimit: 1000, //k
                    extraHTML: "<p style='margin-top:10px;'><input type='checkbox' id='ke_img_up_watermark_1' checked='checked'> 图片加水印，防止别人盗用</p>"
                }
            },
            "templates": [
                {
                    demo: "模板1效果演示html",
                    html: "<div style='border:1px solid red'>模板1效果演示html</div><p></p>"
                },
                {
                    demo: "模板2效果演示html",
                    html: "<div style='border:1px solid red'>模板2效果演示html</div>"
                }
            ],
            "font-size": {
                matchElWidth: false,
                menu: {
                    children: [
                        {
                            value: "14px",
                            textContent: "标准",
                            elAttrs: {
                                style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            content: " <span style='font-size:14px'>标准</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>14px</span>"
                        },
                        {
                            value: "16px",
                            textContent: "大",
                            elAttrs: {
                                style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            content: "" +
                            " <span style='font-size:16px'>大</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>16px</span>"
                        },
                        {
                            value: "18px",
                            textContent: "特大",
                            elAttrs: {
                                style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            content: "" +
                            " <span style='font-size:18px'>特大</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>18px</span>"
                        },
                        {
                            value: "20px",
                            textContent: "极大",
                            elAttrs: {
                                style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            content: "" +
                            " <span style='font-size:20px'>极大</span>" +
                            "<span style='position:absolute;top:1px;right:3px;'>20px</span>"
                        }
                    ],
                    width: "125px"
                }
            },
            "draft": {
                // 当前编辑器的历史是否要单独保存到一个键值而不是公用
                // saveKey:"xxx",
                interval: 5,
                limit: 10,
                "helpHtml": "<div " +
                "style='width:200px;'>" +
                "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容，" +
                "如果发现内容丢失，" +
                "请选择恢复编辑历史</div></div>"
            },
            "resize": {
                //direction:["y"]
            },

            "drag-upload": {
                suffix: "png,jpg,jpeg,gif",
                fileInput: "Filedata",
                sizeLimit: 1000,
                serverUrl: "upload.jss",
                serverParams: {
                    waterMark: function () {
                        return true;
                    }
                }
            }
        };
        KISSY.use(fullPlugins, function (S) {
            var args = S.makeArray(arguments);

            args.shift();

            S.each(args, function (arg, i) {
                var argStr = plugins[i], cfg;
                if (cfg = pluginConfig[argStr]) {
                    args[i] = new arg(cfg);
                }
            });

            cfg.plugins = args;
            var editor;
            if (cfg.fromTextarea) {
                editor = Editor.decorate(cfg.fromTextarea, cfg);
            } else {
                editor = new Editor(cfg);
                editor.render();
            }
            editor.on("blur", function () {
                S.log("editor blur");
            });
            editor.on("focus", function () {
                S.log("editor focus");
            });
            editor.on("selectionChange", function (e) {
                S.log("selectionChange : " + e.path.toString());
            });

            window.newEditor = editor;

//            editor.on('paste', function () {
//                return 'x';
//            });
        });
    }
}