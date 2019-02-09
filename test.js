// test.js

"use strict";

//one global variable to rule them all
const DEG = {
    doc: document,
    cells: Array.from(document.getElementsByClassName("cell")),
    body: document.getElementsByTagName("body"),
    tbody: document.getElementsByTagName("tbody"),
    focusCell: null,
    upButton: document.getElementById("up"),
    downButton: document.getElementById("down"),
    leftButton: document.getElementById("left"),
    rightButton: document.getElementById("right"),
    markButton: document.getElementById("mark"),
    activeElm: 0,
    focusedCell: 0
};

DEG.body[0].addEventListener("focusin", function() {
    var current = DEG.cells.indexOf(document.activeElement);
    if (current > -1) {
        DEG.focusedCell = current;
    }
});

DEG.focusCell = function (cellIndex) {
    DEG.cells[cellIndex].focus();
};

DEG.focusCell(0);

DEG.body[0].addEventListener("focus", function() {
    if (document.activeElement === DEG.body[0]) {
        DEG.focusCell(DEG.focusedCell);
    }
});

DEG.upButton.addEventListener("click", function () {
    if(DEG.focusedCell > 4) {
        DEG.focusCell(DEG.focusedCell - 4);
    } else {
        DEG.focusCell(DEG.focusedCell);
    }
});

DEG.downButton.addEventListener("click", function() {
    if(DEG.focusedCell < 8) {
        DEG.focusCell(DEG.focusedCell + 4);
    } else {
        DEG.focusCell(DEG.focusedCell);
    }
});

DEG.rightButton.addEventListener("click", function () {
    if(DEG.focusedCell !== 3 && DEG.focusedCell !== 7 && DEG.focusedCell !== 11) {
        DEG.focusCell(DEG.focusedCell + 1);
    } else {
        DEG.focusCell(DEG.focusedCell);
    }
});

DEG.leftButton.addEventListener("click", function () {
    if(DEG.focusedCell !== 0 && DEG.focusedCell !== 4 && DEG.focusedCell !== 8) {
        DEG.focusCell(DEG.focusedCell - 1);
    } else {
        DEG.focusCell(DEG.focusedCell);
    }
});

DEG.markButton.addEventListener("click", function () {
    DEG.cells[DEG.focusedCell].style.backgroundColor = "yellow";
    DEG.focusCell(DEG.focusedCell);
});