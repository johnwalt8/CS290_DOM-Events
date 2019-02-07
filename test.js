// test.js

"use strict";

//one global variable to rule them all
var DEG = {
    cells: Array.from(document.getElementsByClassName("cell")),
    focusCell: null,
    upButton: document.getElementById("up"),
    activeElm: 0,
    focusedCell: 0,
};

DEG.focusCell = function (cellIndex) {
    DEG.cells[cellIndex].focus();
    DEG.focusedCell = cellIndex;
};

DEG.focusCell(0);

DEG.upButton.addEventListener("click", function () {
    var current = DEG.cells.indexOf(document.activeElement);
    console.log("current: " + current);
    if(current > 4) {
        DEG.focusCell(current - 4);
    }
    // DEG.focusCell(3);
    // DEG.activeElm = document.activeElement;
});

// console.log(DEG.activeElm);