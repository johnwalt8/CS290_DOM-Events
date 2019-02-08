// test.js

"use strict";

//one global variable to rule them all
const DEG = {
    increment: null,
    column: null,
    tabIndex: null,
    rowCol: null,
    doc: {},
    body: {},
    page: {},
    addTextAttr: null,
    makePage: null
};

DEG.doc = document;
DEG.body = document.body;

DEG.increment = function () {
    var current, value = 0;
    return function () {
        current = value;
        value += 1;
        return current;
    };
};

DEG.column = (DEG.increment());

DEG.tabIndex = (DEG.increment());

DEG.rowCol = function () {

};

DEG.page = {
    "h3": {
        "tag": "h3",
        "text": "Walter Johnson, CS290 HW Assignment: DOM & Events"
    },
    "table": {
        "tag": "table",
        "caption": {
            "tag": "caption",
            "text": "This is a 4 by 4 table (including header) with self-referential content"
        },
        "thead": {
            "tag": "thead",
            "tr": {
                "tag": "tr",
                "th": {
                    "tag": "th",
                    "text": "Header ",
                    "dups": 4
                }
            }
        },
        "tbody": {
            "tag": "tbody",
            "tr": {
                "tag": "tr",
                "td": {
                    "tag": "td",
                    "attr": {
                        "class": "cell",
                        "tabindex": ""
                    },
                    "text": "cell ",
                    "dups": 4
                },
                "dups": 3
            }
        }
    },
    "upDiv": {
        "tag": "div",
        "button": {
            "tag": "button",
            "attr": {
                "type": "button",
                "id": "up"
            },
            "text": "UP"
        }
    },
    "lRDiv": {
        "tag": "div",
        "button1": {
            "tag": "button",
            "attr": {
                "type": "button",
                "id": "left"
            },
            "text": "LEFT"
        },
        "button2": {
            "tag": "button",
            "attr": {
                "type": "button",
                "id": "right"
            },
            "text": "RIGHT"
        }
    },
    "downDiv": {
        "tag": "div",
        "button": {
            "tag": "button",
            "attr": {
                "type": "button",
                "id": "down"
            },
            "text": "DOWN"
        }
    },
    "markDiv": {
        "tag": "div",
        "button": {
            "tag": "button",
            "attr": {
                "type": "button",
                "id": "mark"
            },
            "text": "Mark Cell"
        }
    }
};

DEG.addTextAttr = function (prop, node) {
    var text, textNode, attr, index;
    if (prop.hasOwnProperty("text")) {
        text = prop.text;
        if (prop.tag === "th") {
            text = text + DEG.column();
        } else if (prop.tag === "td") {
            text = text + DEG.rowCol();
        }
        textNode = DEG.doc.createTextNode(text);
        node.appendChild(textNode);
    }
    if (prop.hasOwnProperty("attr")) {
        for (attr in prop.attr) {
            if (attr === "tabindex") {
                index = DEG.tabIndex();
                node.setAttribute(attr, index);
            } else {
                node.setAttribute(attr, prop.attr[attr]);
            }
        }
    }
};

DEG.makePage = function (parentNode, propName) {
    var prop, tag, node, i, dups;
    for (prop in propName) {
        if (propName.hasOwnProperty(prop) && propName[prop].hasOwnProperty("tag")) {
            tag = propName[prop].tag;
            dups = propName[prop].dups || 1;
            for (i = 0; i < dups; i += 1) {
                node = DEG.doc.createElement(tag);
                DEG.addTextAttr(propName[prop], node);
                parentNode.appendChild(node);
                DEG.makePage(node, propName[prop]);
            }
        }
    }
};


DEG.makePage(DEG.body, DEG.page);