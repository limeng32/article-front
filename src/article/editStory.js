var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Editor = require('editor');
var EditorUploader = require('kg/editoruploader/2.0.3/index');
var DefaultTheme = require('kg/uploader/2.0.3/themes/default/index');
var S = KISSY;
var Node = require('node');
var SP = require('../smartPath/smartPath');
var AI = require('../authIdentify/index');
var IO = require('io');
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var UA = require('ua');
var AD = require('kg/agiledialog/1.0.2/index');
var JSONX = require('../jsonx/jsonx');
module.exports = {
    init: function () {
        var left = new Node('<div>').addClass('left'), middle = new Node('<div>').addClass('middle'), right = new Node('<div>').addClass('right');
        $('article').append(left).append(middle).append(right);
        var ai = new AI(token);
        var submitForm = new Node('<form>').prop({
            action: SP.resolvedPath('writeStory/submitNew'),
            method: 'post'
        });
        var editorContainer = new Node('<div>').addClass('editorContainer');
        var submitButton = new Node('<input>').prop({
            type: 'submit',
            value: '发表'
        }).addClass('ks-button ks-button-info ks-button-shown signButton submitButton');
        var submitButtonContainer = new Node('<div>').addClass('submitButtonContainer');
        var left1 = new Node('<div>').addClass('submitButtonContainerLeft');
        var submitButtonContainerMiddle = new Node('<div>').addClass('submitButtonContainerMiddle');
        var right1 = new Node('<div>').addClass('submitButtonContainerRight');
        var titleContainer = new Node('<div>').addClass('titleContainer');
        var titleNode = new Node('<input>').prop({
            type: 'text',
            name: 'title'
        }).attr('min-len-title', '2').attr('max-len-title', '50').attr('pattern', '^(?!.*?(<|>)).*$').attr('pattern-msg', '标题中不能含有字符<和>').addClass('titleNode');
        var titleText = new Node('<span>').html('标题：').addClass('titleText');
        titleContainer.append(titleText).append(titleNode);
        var contentHidden = new Node('<input>').prop({
            type: 'hidden',
            name: 'content'
        }).attr('min-len-content', '20').attr('max-len-content', '32000').attr('checkAI', '');
        var contentHiddenContainer = new Node('<div>');
        middle.append(submitForm.append(titleContainer).append(editorContainer).append(submitButtonContainer.append(left1).append(submitButtonContainerMiddle).append(right1)));
        if (ai.existChecked()) {
            submitButtonContainerMiddle.append(submitButton);
        } else {
            submitButtonContainerMiddle.append('请您先').
                append(new Node('<a>').prop({
                    href: SP.resolvedPath('signIn')
                }).append('登录')).append('或者').
                append(new Node('<a>').prop({
                    href: SP.resolvedPath('signUp')
                }).append('注册'));
        }
        submitForm.append(contentHiddenContainer.append(contentHidden));
        var writerHidden = new Node('<input>').prop({
            type: 'hidden',
            name: 'accountId',
            value: token
        })
        submitForm.append(writerHidden);
        var formAuth = new Auth(submitForm);
        formAuth.plug(new AuthMsgs());
        formAuth.register('checkAI', function (value, attr, defer, field) {
            var self = this;
            if (ai.existChecked()) {
                var dialog = new AD({
                    title: '温馨提示',
                    content: '您确定要提交这个作品？',
                    onConfirm: function () {
                        defer.resolve(self);
                    },
                    onCancel: function () {
                        defer.reject(self);
                    }
                });
            } else {
                new AD({
                    type: 'alert',
                    content: "请您先登录再进行创作"
                });
                defer.reject(self);
            }
            return defer.promise;
        }).register('min-len-content', function (value, attr, defer, field) {
            var self = this;
            if (value.length >= Number(attr)) {
                defer.resolve(self);
            } else {
                new AD({
                    type: 'alert',
                    content: "您输入的内容过少，无法提交"
                });
                defer.reject(self);
            }
            return defer.promise;
        }).register('max-len-content', function (value, attr, defer, field) {
            var self = this;
            if (value.length <= Number(attr)) {
                defer.resolve(self);
            } else {
                new AD({
                    type: 'alert',
                    content: "您输入的内容过多，无法提交"
                });
                defer.reject(self);
            }
            return defer.promise;
        }).register('min-len-title', function (value, attr, defer, field) {
            var min = Number(attr);
            this.msg('error', '标题不能少于' + min + '个字');
            return value.length >= Number(attr);
        }).register('max-len-title', function (value, attr, defer, field) {
            var max = Number(attr);
            this.msg('error', '标题不能多于' + max + '个字');
            return value.length <= Number(attr);
        });
        var cfg = {
            focused: true,
            attachForm: true,
            render: editorContainer,
            height: 400,
            baseZIndex: 10000
            // customLink:["http://localhost/customLink.css","http://xx.com/y2.css"],
        };
        var plugins = (
        "code" +
        ",separator" +
        ",bold" +
        ",italic," +
        "font-family," +
        "font-size," +
        "strike-through," +
        "underline," +
        "separator" +
            //",image" +
        ",link" +
        ",fore-color" +
        ",back-color" +
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
        ",smiley").split(",");

        var fullPlugins = [];

        S.each(plugins, function (p, i) {
            fullPlugins[i] = "editor/plugin/" + p;
        });
        //初始化上传插件
        var editorUploader = new EditorUploader({
            prefix: 'demo-',
            multiple: false,
            auth: {
                max: 5,
                allowExts: 'jpg,png,gif,bmp,jpeg',
                allowRepeat: false,
                maxSize: 1024
            },
            type: ["auto"],
            action: SP.resolvedIOPath('uploadFile?_content=json'),
            autoUpload: true,
            name: 'Filedata',
            listeners: {}
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
            if (ai.existChecked() && UA.ie != 9) {
                cfg.plugins.push(editorUploader);
            }
            var editor;
            if (cfg.fromTextarea) {
                editor = Editor.decorate(cfg.fromTextarea, cfg);
            } else {
                editor = new Editor(cfg);
                editor.render();
            }
            formAuth.render();
            editor.on("blur", function () {
                contentHidden.getDOMNode().value = editor.getData();
            });
            editor.on("focus", function () {
                formAuth.getField('content').get('msg').hide();
            });
            editor.on("selectionChange", function (e) {
            });
            window.newEditor = editor;
            new IO({
                type: 'POST',
                url: SP.resolvedIOPath('readStory/get?_content=json'),
                data: {storyId: storyId},
                success: function (d) {
                    d = JSONX.decode(d);
                    if (d == null) {
                        new AD({
                            type: 'alert',
                            content: "您访问的故事并不存在"
                        });
                    } else if (d.account != null) {
                        if (ai.existChecked()) {
                            ai.acquireAccount(SP.resolvedIOPath('getAccount?_content=json'), function (account) {
                                    if (account == null) {
                                        new AD({
                                            type: 'alert',
                                            content: "您的账号出现问题"
                                        });
                                    } else if (account.id == d.account.id) {
                                        editor.setData(d.content);
                                        titleNode.getDOMNode().value = d.title;
                                    } else {
                                        new AD({
                                            type: 'alert',
                                            content: "您不是这个故事的作者，无法编辑"
                                        });
                                    }
                                }
                            );
                        }
                    } else {
                        new AD({
                            type: 'alert',
                            content: "这个故事没有作者，无法编辑"
                        });
                    }
                },
                error: function (n, textStatus, _io) {
                    new AD({
                        type: 'alert',
                        content: textStatus
                    });
                }
            });
            //IO.post(SP.resolvedIOPath('readStory/get?_content=json'), {storyId: storyId}, function (d) {
            //    }, "json"
            //);
        });
    }
}