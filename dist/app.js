"use strict";
let blackBackgrand;
let discLayer;
let discAllowedLayer;
let AnnotationUpFram;
let AnnotationSideFram;
let whiteScorTag;
let blackScorTag;
let whiteAlertTag;
let blackAlertTag;
let gap = 3;
let cellSize = 65;
let discSize = 58;
let discGap = (cellSize - discSize) / 2;
let indexMemory = 0;
let memoryDiscs = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];
let discs = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];
let allowedDiscs = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];
let gameMemory = new Array();
let turn = 1;
let disableClick = false;
function init() {
    /* run on load page:
          1-change "balckBagrand" width and height size to adapte with squares.
          2-call drawGreenSquares function.
      */
    blackBackgrand = document.getElementById("blackBackgrand");
    discLayer = document.getElementById("discLayer");
    AnnotationUpFram = document.getElementById("up-fram");
    AnnotationSideFram = document.getElementById("side-fram");
    whiteScorTag = document.getElementById("frame-score-white");
    blackScorTag = document.getElementById("frame-score-black");
    whiteAlertTag = document.getElementById("frame-alert-white");
    blackAlertTag = document.getElementById("frame-alert-black");
    discAllowedLayer = (document.getElementById("discAllowedMovement"));
    blackBackgrand.style.width = cellSize * 8 + gap * 9 + "px";
    blackBackgrand.style.height = cellSize * 8 + gap * 9 + "px";
    drawAnnotationFram();
    drawGreenSquares();
    drawDiscs();
    allowedMovement();
    drawAllowedMovement();
    whiteScorTag.innerText = "2";
    blackScorTag.innerText = "2";
    turnComment();
    setMemory();
    drawtools();
    elementVisibility("btn-left", false);
    elementVisibility("btn-right", false);
}
function drawGreenSquares() {
    /* this function add a div into "blackBackgrand" div's and put some attribute on this.*/
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let greenSquare = document.createElement("div");
            greenSquare.setAttribute("id", "greenSquare");
            greenSquare.style.width = cellSize + "px";
            greenSquare.style.height = cellSize + "px";
            greenSquare.style.left = (cellSize + gap) * column + gap + "px";
            greenSquare.style.top = (cellSize + gap) * row + gap + "px";
            /*set square positon for call function.*/
            greenSquare.setAttribute("onclick", "clickSquare(" + row + "," + column + ")");
            blackBackgrand.appendChild(greenSquare);
        }
    }
}
function drawAnnotationFram() {
    /* this function add a div into "blackBackgrand" div's and put some attribute on this.*/
    for (let column = 0; column < 8; column++) {
        let AnnotationElement = (document.createElement("div"));
        AnnotationElement.setAttribute("id", "annotation-up");
        AnnotationElement.style.width = cellSize + "px";
        AnnotationElement.style.height = cellSize + "px";
        AnnotationElement.style.left = (cellSize + gap) * column + gap + "px";
        AnnotationElement.style.top = (cellSize + gap) * 0 + gap + "px";
        AnnotationElement.textContent = AnnotationText(0, column);
        AnnotationUpFram.appendChild(AnnotationElement);
    }
    for (let row = 0; row < 8; row++) {
        let AnnotationElement = (document.createElement("div"));
        AnnotationElement.setAttribute("id", "annotation-side");
        AnnotationElement.style.width = cellSize + "px";
        AnnotationElement.style.height = cellSize + "px";
        AnnotationElement.style.left = (cellSize + gap) * 0 + gap + "px";
        AnnotationElement.style.top = (cellSize + gap) * row + gap + "px";
        AnnotationElement.textContent = AnnotationText(1, row);
        AnnotationSideFram.appendChild(AnnotationElement);
    }
}
function clickSquare(row, column) {
    //This function run while click on the tabel.
    if (disableClick == true) {
        return;
    }
    if (discs[row][column] != 0) {
        return;
    }
    if (canClickSpot(row, column) == true) {
        let affectedDiscs = getAffectedDiscs(row, column);
        flipDiscs(affectedDiscs);
        discs[row][column] = turn;
        swichDiscs();
        drawDiscs();
        let ChekSituation = allowedMovement();
        if (ChekSituation == false) {
            swichDiscs();
            allowedMovement();
        }
        drawAllowedMovement();
    }
    else {
        return;
    }
    playSound("sound/click.wav");
    let gameScore = Score();
    whiteScorTag.innerText = gameScore.white.toString();
    blackScorTag.innerText = gameScore.black.toString();
    turnComment();
    setMemory();
}
function canClickSpot(row, column) {
    // This function check allowed movement.
    let affectedDiscs = getAffectedDiscs(row, column);
    if (affectedDiscs.length == 0) {
        return false;
    }
    else {
        return true;
    }
}
function getAffectedDiscs(row, column) {
    /**
     * This function identifies the disks that are affected by the main movement.
     * Also we can use this function for check allowed movement.
     * For more information about this function read doc-fa.docx [persian languege].
     */
    let affectedDiscs = [];
    let couldBeAffected;
    let columnIterator;
    let rowIterator;
    //Right Check :
    couldBeAffected = [];
    columnIterator = column;
    while (columnIterator < 7) {
        columnIterator += 1;
        let valueAtSpot = discs[row][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: row,
                column: columnIterator,
            };
            couldBeAffected.push(discLocation);
        }
    }
    //Left :
    couldBeAffected = [];
    columnIterator = column;
    while (columnIterator > 0) {
        columnIterator -= 1;
        let valueAtSpot = discs[row][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: row,
                column: columnIterator,
            };
            couldBeAffected.push(discLocation);
        }
    }
    //above :
    couldBeAffected = [];
    rowIterator = row;
    while (rowIterator > 0) {
        rowIterator -= 1;
        let valueAtSpot = discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: rowIterator,
                column: column,
            };
            couldBeAffected.push(discLocation);
        }
    }
    //below :
    couldBeAffected = [];
    rowIterator = row;
    while (rowIterator < 7) {
        rowIterator += 1;
        let valueAtSpot = discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: rowIterator,
                column: column,
            };
            couldBeAffected.push(discLocation);
        }
    }
    //down right :
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while (rowIterator < 7 && columnIterator < 7) {
        rowIterator += 1;
        columnIterator += 1;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: rowIterator,
                column: columnIterator,
            };
            couldBeAffected.push(discLocation);
        }
    }
    //down left :
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while (rowIterator < 7 && columnIterator > 0) {
        rowIterator += 1;
        columnIterator -= 1;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: rowIterator,
                column: columnIterator,
            };
            couldBeAffected.push(discLocation);
        }
    }
    //up left :
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while (rowIterator > 0 && columnIterator > 0) {
        rowIterator -= 1;
        columnIterator -= 1;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: rowIterator,
                column: columnIterator,
            };
            couldBeAffected.push(discLocation);
        }
    }
    //up right :
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while (rowIterator > 0 && columnIterator < 7) {
        rowIterator -= 1;
        columnIterator += 1;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            let discLocation = {
                row: rowIterator,
                column: columnIterator,
            };
            couldBeAffected.push(discLocation);
        }
    }
    return affectedDiscs;
}
function flipDiscs(affectDiscs) {
    //This function flip black disks to white and white disks to black.
    for (let i = 0; i < affectDiscs.length; i++) {
        let spot = affectDiscs[i];
        if (discs[spot.row][spot.column] == 1) {
            discs[spot.row][spot.column] = 2;
        }
        else {
            discs[spot.row][spot.column] = 1;
        }
    }
}
function drawDiscs() {
    // This function draw all of movement for each discs and set attribute for them.
    // Also at the end of this function we call  'allowedMovement' and drawAllowedMovement' function's.
    discLayer.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let value = discs[row][column];
            if (value == 0) {
            }
            else {
                let disc = document.createElement("div");
                disc.setAttribute("id", "disc");
                disc.style.width = discSize + "px";
                disc.style.height = discSize + "px";
                disc.style.left = (cellSize + gap) * column + gap + discGap + "px";
                disc.style.top = (cellSize + gap) * row + gap + discGap + "px";
                if (value == 1) {
                    /* disc.style.backgroundColor = "black";*/
                    disc.setAttribute("class", "disc-black");
                }
                if (value == 2) {
                    /*disc.style.backgroundColor = "white";*/
                    disc.setAttribute("class", "disc-white");
                }
                discLayer.appendChild(disc);
            }
        }
    }
}
function allowedMovement() {
    // This function find all of allowed movement and put them to 'allowedDiscs'.
    // Also this function can return all allowed movement as array.
    clearTable(discAllowedLayer, allowedDiscs);
    let movement = false;
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            if (discs[row][column] == 0) {
                if (canClickSpot(row, column) == true) {
                    allowedDiscs[row][column] = 1;
                    movement = true;
                }
            }
        }
    }
    return movement;
}
function drawAllowedMovement() {
    // This function Draw All of Allowed Movement for each disc.
    discAllowedLayer.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let value = allowedDiscs[row][column];
            if (value == 0) {
            }
            else {
                let disc = document.createElement("div");
                disc.setAttribute("id", "allowedMovement");
                disc.style.width = discSize + "px";
                disc.style.height = discSize + "px";
                disc.style.left = (cellSize + gap) * column + gap + discGap + "px";
                disc.style.top = (cellSize + gap) * row + gap + discGap + "px";
                disc.setAttribute("onclick", "clickSquare(" + row + "," + column + ")");
                discAllowedLayer.appendChild(disc);
            }
        }
    }
}
function clearTable(tabel, obj) {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            obj[row][column] = 0;
        }
    }
}
function Score() {
    let blackScore = 0;
    let whiteScore = 0;
    let value;
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            value = discs[row][column];
            if (value == 0) {
                /* do not anyting :) */
            }
            else {
                if (value == 1) {
                    blackScore = blackScore + 1;
                }
                if (value == 2) {
                    whiteScore = whiteScore + 1;
                }
            }
        }
    }
    return {
        black: blackScore,
        white: whiteScore,
    };
}
function playSound(audioPath) {
    var audio = new Audio(audioPath);
    audio.play();
}
function swichDiscs() {
    /*swich between tow colors */
    if (turn == 1) {
        turn = 2; /*white number*/
    }
    else {
        turn = 1;
    }
}
function AnnotationText(type, id) {
    let output = "";
    if (type == 0) {
        switch (id) {
            case 0:
                output = "A";
                break;
            case 1:
                output = "B";
                break;
            case 2:
                output = "C";
                break;
            case 3:
                output = "E";
                break;
            case 4:
                output = "F";
                break;
            case 5:
                output = "G";
                break;
            case 6:
                output = "H";
                break;
            case 7:
                output = "I";
        }
    }
    if (type == 1) {
        switch (id) {
            case 0:
                output = "1";
                break;
            case 1:
                output = "2";
                break;
            case 2:
                output = "3";
                break;
            case 3:
                output = "4";
                break;
            case 4:
                output = "5";
                break;
            case 5:
                output = "6";
                break;
            case 6:
                output = "7";
                break;
            case 7:
                output = "8";
        }
    }
    return output;
}
function turnComment() {
    if (turn == 1) {
        blackAlertTag.innerHTML = '<div class="blink_me">حرکت با شماست</div>';
        whiteAlertTag.innerHTML =
            '<div class="circul-waiting"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45"/></svg></div>';
    }
    else {
        whiteAlertTag.innerHTML = '<div class="blink_me">حرکت با شماست</div>';
        blackAlertTag.innerHTML =
            '<div class="circul-waiting"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45"/></svg></div>';
    }
    let gameScore = Score();
    let scoreBlack = gameScore.black;
    let scoreWhite = gameScore.white;
    let ChekSituation = allowedMovement();
    if (ChekSituation == false) {
        if (scoreBlack > scoreWhite) {
            whiteAlertTag.innerHTML = '<div class="blink_me"> مهره سفید باخت</div>';
            blackAlertTag.innerHTML = '<div class="blink_me">مهره سیاه برد</div>';
        }
        if (scoreBlack == scoreWhite) {
            whiteAlertTag.innerHTML = '<div class="blink_me">بازی مساوی شد</div>';
            blackAlertTag.innerHTML = '<div class="blink_me">بازی مساوی شد</div>';
        }
        if (scoreBlack < scoreWhite) {
            whiteAlertTag.innerHTML = '<div class="blink_me"> مهره سفید برد</div>';
            blackAlertTag.innerHTML = '<div class="blink_me">مهره سیاه باخت</div>';
        }
        elementVisibility("btn-left", true);
        elementVisibility("btn-right", true);
    }
}
function setMemory() {
    let discmemo = new Array();
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            discmemo.push(discs[row][column]);
        }
    }
    gameMemory.push(discmemo);
    indexMemory = gameMemory.length - 1;
}
function getMemory(index) {
    let discmemo = gameMemory[index];
    let couter = 0;
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            couter += 1;
            memoryDiscs[row][column] = discmemo[couter - 1];
        }
    }
}
function drawtools() {
    let buttons;
    buttons = document.getElementById("buttons-section");
    buttons.innerHTML = `<div id="btn-left"><button class="button-19" id="btn" role="button" onclick="getBack()">عقب</button></div>
    <div id="btn-center"><button class="button-19" role="button" onclick="reStart()">شروع مجدد</button></div>
    <div id="btn-right"><button class="button-19" id="btn" role="button" onclick="getNext()">جلو</button></div>
  `;
}
function reStart() {
    disableClick = false;
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            allowedDiscs[row][column] = 0;
            discs[row][column] = 0;
            if (row == 3 && column == 3) {
                discs[row][column] = 2;
            }
            if (row == 3 && column == 4) {
                discs[row][column] = 1;
            }
            if (row == 4 && column == 3) {
                discs[row][column] = 1;
            }
            if (row == 4 && column == 4) {
                discs[row][column] = 2;
            }
        }
    }
    turn = 1;
    drawAnnotationFram();
    drawGreenSquares();
    drawDiscs();
    allowedMovement();
    drawAllowedMovement();
    whiteScorTag.innerText = "2";
    blackScorTag.innerText = "2";
    turnComment();
    gameMemory = [];
    indexMemory = 0;
    elementVisibility("btn-left", false);
    elementVisibility("btn-right", false);
}
function getBack() {
    if (indexMemory == 0) {
        return;
    }
    discAllowedLayer.innerHTML = "";
    disableClick = true;
    indexMemory -= 1;
    getMemory(indexMemory);
    drawMemory();
}
function getNext() {
    if (indexMemory == memoryDiscs.length - 1) {
        return;
    }
    discAllowedLayer.innerHTML = "";
    disableClick = true;
    indexMemory += 1;
    getMemory(indexMemory);
    drawMemory();
}
function drawMemory() {
    // This function draw all of movement for each discs and set attribute for them.
    // Also at the end of this function we call  'allowedMovement' and drawAllowedMovement' function's.
    discLayer.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let value = memoryDiscs[row][column];
            if (value == 0) {
                // console.log(row + "," + column + "," + value);
            }
            else {
                let disc = document.createElement("div");
                disc.setAttribute("id", "disc");
                disc.style.width = discSize + "px";
                disc.style.height = discSize + "px";
                disc.style.left = (cellSize + gap) * column + gap + discGap + "px";
                disc.style.top = (cellSize + gap) * row + gap + discGap + "px";
                if (value == 1) {
                    /* disc.style.backgroundColor = "black";*/
                    disc.setAttribute("class", "disc-black");
                }
                if (value == 2) {
                    /*disc.style.backgroundColor = "white";*/
                    disc.setAttribute("class", "disc-white");
                }
                discLayer.appendChild(disc);
            }
        }
    }
}
function elementVisibility(tagName, visible) {
    let element = document.getElementById(tagName);
    let element2 = (document.getElementById("btn-center"));
    if (visible == true) {
        element.style.visibility = "visible";
        element.style.width = "20%";
        element2.style.width = "53%";
    }
    else {
        element.style.visibility = "hidden";
        element.style.width = "0px";
        element2.style.width = "96%";
    }
}
//# sourceMappingURL=app.js.map