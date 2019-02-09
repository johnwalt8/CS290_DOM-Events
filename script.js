// script.js

"use strict";

//one global variable to rule them all
    //(and table of contents)
const DEG = {
    doc: document,          // the document object
    body: document.body,    // the body object
    // create the page
    increment: null,        // returns closure in increment value
    column: null,           // instance of "increment" for Header column value
    tabIndex: null,         // instance of "increment" for tabindex values
    rowCol: null,           // closure for cell row and column values
    page: {},               // page object contains page html as JSON
    addTextAttr: null,      // function adds text and attributes to tags
    tabindexToDoc: null,    // function adds tabindex property and value to <html> and <body>
    makePage: null,         // function makes page from page object
    // add the style
    style: {},              // style object contains css selectors and ruls as JSON
    makeStyle: null,        // function makes style sheet from style object
    // add functionality
    cells: [],              // array of table <td> cells
    html: {},               // element objects
    upButton: {},
    downButton: {},
    leftButton: {},
    rightButton: {},
    markButton: {},
    focusCell: null,        // function to set focus on current table cell
    blueCell: 0             // index of current table cell
};

DEG.increment = function () {
    var current, value = 0;
    return function () { // returns current value and increments for next use
        current = value;
        value += 1;
        return current;
    };
};

DEG.column = (DEG.increment());

DEG.tabIndex = (DEG.increment());

DEG.rowCol = (function () {
    var row = 1, col = 1, rowCol = "";
    return function () {
        rowCol = row + ", " + col;
        if (col === 4) { // increments row after 4th column
            row += 1;
            col = 1;
        } else {
            col += 1;
        }
        return rowCol;    
    };
}());

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

DEG.tabindexToDoc = function () {
    var html, body, index;
    html = DEG.doc.getElementsByTagName("html")[0];
    index = DEG.tabIndex();
    html.setAttribute("tabindex", index)
    body = DEG.doc.getElementsByTagName("body")[0];
    index = DEG.tabIndex();
    body.setAttribute("tabindex", index)
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

DEG.style = {
    'html': {'background': '#404040'},
    'body': {
        'width': '95%',
        'max-width': '700px',
        'min-height': '700px',
        'padding': '14px',
        'margin': '7px auto',
        'background-color': 'rgb(242, 242, 242)',
        'border': 'solid 3px'
    },
    'h3':{'text-align': 'center'},
    'table':{
        'border': '1px solid black',
        'border-spacing': '0px',
        'margin': 'auto',
        'margin-top': '7px',
        'margin-bottom': '14px',
    },
    'th, td':{
        'text-align': 'center',
        'border': '1px solid black',
        'padding': '14px 28px',
        'margin': 'auto'
    },
    '.cell:focus':{
        'border': '4px solid blue',
        'border-style': 'inset',
        'padding': '10px 24px'
    },
    'div':{'text-align': 'center'},
    'button':{
        'width': '154px',
        'height': '28px',
        'margin': '4px auto',
        'display': 'inline-block'
    },
    '#mark':{'margin-top': '14px'}
};

DEG.makeStyle = function (parent, styleObject) {
    var sheet, selector, prop, rule, index;
    sheet = parent.head.appendChild(DEG.doc.createElement('style')).sheet;
    for (selector in styleObject) {
        for (prop in styleObject[selector]) {
            rule = selector + " { " + prop + " : " + styleObject[selector][prop] + " }";
            index = sheet.cssRules.length;
            sheet.insertRule(rule, index);
        }
    }
};

DEG.makePage(DEG.body, DEG.page);
DEG.tabindexToDoc();
DEG.makeStyle(DEG.doc, DEG.style);

// now that the page exists, we can get some elements
DEG.cells = Array.from(DEG.doc.getElementsByClassName("cell"));
DEG.html = DEG.doc.getElementsByTagName("html");
DEG.upButton = DEG.doc.getElementById("up");
DEG.downButton = DEG.doc.getElementById("down");
DEG.leftButton = DEG.doc.getElementById("left");
DEG.rightButton = DEG.doc.getElementById("right");
DEG.markButton = DEG.doc.getElementById("mark");

// return focus to blueCell when page clicked
DEG.html[0].addEventListener("focus", function() {
    if (DEG.doc.activeElement === DEG.html[0]) {
        DEG.focusCell(DEG.blueCell);
    }
});

// return focus to blueCell when body clicked
DEG.body.addEventListener("focus", function() {
    if (DEG.doc.activeElement === DEG.body) {
        DEG.focusCell(DEG.blueCell);
    }
});


// focus change on any table <td> resets DEG.blueCell
DEG.body.addEventListener("focusin", function() {
    var current = DEG.cells.indexOf(DEG.doc.activeElement);
    if (current > -1) {
        DEG.blueCell = current;
    }
});

DEG.upButton.addEventListener("click", function () {
    if(DEG.blueCell > 3) {
        DEG.focusCell(DEG.blueCell - 4);
    } else {
        DEG.focusCell(DEG.blueCell);
    }
});

DEG.downButton.addEventListener("click", function() {
    if(DEG.blueCell < 8) {
        DEG.focusCell(DEG.blueCell + 4);
    } else {
        DEG.focusCell(DEG.blueCell);
    }
});

DEG.rightButton.addEventListener("click", function () {
    if(DEG.blueCell !== 3 && DEG.blueCell !== 7 && DEG.blueCell !== 11) {
        DEG.focusCell(DEG.blueCell + 1);
    } else {
        DEG.focusCell(DEG.blueCell);
    }
});

DEG.leftButton.addEventListener("click", function () {
    if(DEG.blueCell !== 0 && DEG.blueCell !== 4 && DEG.blueCell !== 8) {
        DEG.focusCell(DEG.blueCell - 1);
    } else {
        DEG.focusCell(DEG.blueCell);
    }
});

DEG.markButton.addEventListener("click", function () {
    DEG.cells[DEG.blueCell].style.backgroundColor = "yellow";
    DEG.focusCell(DEG.blueCell);
});

DEG.focusCell = function (cellIndex) {
    DEG.cells[cellIndex].focus();
};

DEG.focusCell(0);