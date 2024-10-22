
CKEDITOR.dialog.add("html5video", function(b) {
    return {
        title: b.lang.html5video.title,
        minWidth: 500,
        minHeight: 100,
        contents: [{
            id: "info",
            label: b.lang.html5video.infoLabel,
            elements: [{
                    type: "vbox",
                    padding: 0,
                    children: [{
                        type: "hbox",
                        widths: ["365px", "110px"],
                        align: "right",
                        children: [{
                                type: "text",
                                id: "url",
                                label: b.lang.html5video.allowed,
                                required: !0,
                                validate: CKEDITOR.dialog.validate.notEmpty(b.lang.html5video.urlMissing),
                                setup: function(a) {
                                    this.setValue(a.data.src)
                                },
                                commit: function(a) {
                                    a.setData("src", this.getValue())
                                }
                            },
                            {
                                type: "button",
                                id: "browse",
                                style: "display:inline-block;margin-top:14px;",
                                align: "center",
                                label: b.lang.common.browseServer,
                                hidden: !0,
                                filebrowser: "info:url"
                            }
                        ]
                    }]
                },
                {
                    type: "checkbox",
                    id: "responsive",
                    label: b.lang.html5video.responsive,
                    setup: function(a) {
                        this.setValue(a.data.responsive)
                    },
                    commit: function(a) {
                        a.setData("responsive", this.getValue() ? "true" : "")
                    }
                },
                {
                    type: "hbox",
                    id: "size",
                    children: [{
                        type: "text",
                        id: "width",
                        label: b.lang.common.width,
                        setup: function(a) {
                            a.data.width && this.setValue(a.data.width)
                        },
                        commit: function(a) {
                            a.setData("width",
                                this.getValue())
                        }
                    }, {
                        type: "text",
                        id: "height",
                        label: b.lang.common.height,
                        setup: function(a) {
                            a.data.height && this.setValue(a.data.height)
                        },
                        commit: function(a) {
                            a.setData("height", this.getValue())
                        }
                    }]
                }, {
                    type: "hbox",
                    id: "alignment",
                    children: [{
                        type: "radio",
                        id: "align",
                        label: b.lang.common.align,
                        items: [
                            [b.lang.common.alignCenter, "center"],
                            [b.lang.common.alignLeft, "left"],
                            [b.lang.common.alignRight, "right"],
                            [b.lang.common.alignNone, "none"]
                        ],
                        "default": "center",
                        setup: function(a) {
                            a.data.align && this.setValue(a.data.align)
                        },
                        commit: function(a) {
                            a.setData("align", this.getValue())
                        }
                    }]
                }
            ]
        }, {
            id: "Upload",
            hidden: !0,
            filebrowser: "uploadButton",
            label: b.lang.html5video.upload,
            elements: [{
                type: "file",
                id: "upload",
                label: b.lang.html5video.btnUpload,
                style: "height:40px",
                size: 38
            }, {
                type: "fileButton",
                id: "uploadButton",
                filebrowser: "info:url",
                label: b.lang.html5video.btnUpload,
                "for": ["Upload", "upload"]
            }]
        }, {
            id: "advanced",
            label: b.lang.html5video.advanced,
            elements: [{
                type: "vbox",
                padding: 0,
                children: [{
                    type: "hbox",
                    children: [{
                        type: "radio",
                        id: "autoplay",
                        label: b.lang.html5video.autoplay,
                        items: [
                            [b.lang.html5video.yes, "yes"],
                            [b.lang.html5video.no, "no"]
                        ],
                        "default": "no",
                        setup: function(a) {
                            a.data.autoplay && this.setValue(a.data.autoplay)
                        },
                        commit: function(a) {
                            a.setData("autoplay", this.getValue())
                        }
                    }]
                }]
            }]
        }]
    }
});
