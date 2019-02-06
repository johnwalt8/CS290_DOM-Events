// test.js

"use strict";

//one global variable to rule them all
var DEG = {
    cells: document.getElementsByClassName("cell"),
    focusCell: null,
    upButton: document.getElementById("up"),
    activeElm: 0,
};

DEG.focusCell = function (cellIndex) {
    DEG.cells[cellIndex].focus();
};

DEG.focusCell(0);

DEG.upButton.addEventListener("click", function () {
    DEG.focusCell(3);
    DEG.activeElm = document.activeElement;
});

console.log(DEG.activeElm);