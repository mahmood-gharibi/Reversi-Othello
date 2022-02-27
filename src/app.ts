let blackBackgrand: HTMLElement;
let discLayer: HTMLElement;
let discAllowedLayer: HTMLElement;
let AnnotationUpFram: HTMLElement;
let AnnotationSideFram: HTMLElement;
let whiteScorTag: HTMLElement;
let blackScorTag: HTMLElement;
let whiteAlertTag: HTMLElement;
let blackAlertTag: HTMLElement;
let gap: number = 3;
let cellSize: number = 65;
let discSize: number = 58;
let discGap: number = (cellSize - discSize) / 2;
let indexMemory: number = 0;
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
let turn: number = 1;
let disableClick = false;

/**
 * run on load page:
 * 1-change "balckBagrand" width and height size to adapte with squares.
 * 2-call drawGreenSquares function.
 */
function init() {
  blackBackgrand = <HTMLElement>document.getElementById("blackBackgrand");
  discLayer = <HTMLElement>document.getElementById("discLayer");
  AnnotationUpFram = <HTMLElement>document.getElementById("up-fram");
  AnnotationSideFram = <HTMLElement>document.getElementById("side-fram");
  whiteScorTag = <HTMLElement>document.getElementById("frame-score-white");
  blackScorTag = <HTMLElement>document.getElementById("frame-score-black");
  whiteAlertTag = <HTMLElement>document.getElementById("frame-alert-white");
  blackAlertTag = <HTMLElement>document.getElementById("frame-alert-black");
  discAllowedLayer = <HTMLElement>(
    document.getElementById("discAllowedMovement")
  );
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

/**
 * this function add a div into "blackBackgrand" div's and put some attribute on this.
 */
function drawGreenSquares() {
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      let greenSquare: HTMLElement = <HTMLElement>document.createElement("div");

      greenSquare.setAttribute("id", "greenSquare");
      greenSquare.style.width = cellSize + "px";
      greenSquare.style.height = cellSize + "px";
      greenSquare.style.left = (cellSize + gap) * column + gap + "px";
      greenSquare.style.top = (cellSize + gap) * row + gap + "px";

      /*set square positon for call function.*/
      greenSquare.setAttribute(
        "onclick",
        "clickSquare(" + row + "," + column + ")"
      );
      blackBackgrand.appendChild(greenSquare);
    }
  }
}

/**
 * this function add a div into "blackBackgrand" div's and put some attribute on this.
 */
function drawAnnotationFram() {
  for (let column = 0; column < 8; column++) {
    let AnnotationElement: HTMLElement = <HTMLElement>(
      document.createElement("div")
    );

    AnnotationElement.setAttribute("id", "annotation-up");
    AnnotationElement.style.width = cellSize + "px";
    AnnotationElement.style.height = cellSize + "px";
    AnnotationElement.style.left = (cellSize + gap) * column + gap + "px";
    AnnotationElement.style.top = (cellSize + gap) * 0 + gap + "px";
    AnnotationElement.textContent = AnnotationText(0, column);
    AnnotationUpFram.appendChild(AnnotationElement);
  }

  for (let row = 0; row < 8; row++) {
    let AnnotationElement: HTMLElement = <HTMLElement>(
      document.createElement("div")
    );

    AnnotationElement.setAttribute("id", "annotation-side");
    AnnotationElement.style.width = cellSize + "px";
    AnnotationElement.style.height = cellSize + "px";
    AnnotationElement.style.left = (cellSize + gap) * 0 + gap + "px";
    AnnotationElement.style.top = (cellSize + gap) * row + gap + "px";
    AnnotationElement.textContent = AnnotationText(1, row);
    AnnotationSideFram.appendChild(AnnotationElement);
  }
}

/**
 * This function run while click on the tabel.
 * @param row
 * @param column
 * @returns
 */
function clickSquare(row: number, column: number) {
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
  } else {
    return;
  }
  playSound("sound/click.wav");
  let gameScore = Score();
  whiteScorTag.innerText = gameScore.white.toString();
  blackScorTag.innerText = gameScore.black.toString();
  turnComment();
  setMemory();
}

/**
 * This function check allowed movement.
 * @param row
 * @param column
 * @returns
 */
function canClickSpot(row: number, column: number): boolean {
  let affectedDiscs = getAffectedDiscs(row, column);
  if (affectedDiscs.length == 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * This function identifies the disks that are affected by the main movement.
 * Also we can use this function for check allowed movement.
 * For more information about this function read doc-fa.docx [persian languege].
 * @param row
 * @param column
 * @returns
 */
function getAffectedDiscs(row: number, column: number): any {
  let affectedDiscs: any[] = [];
  let couldBeAffected: any[];
  let columnIterator: number;
  let rowIterator: number;

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
    } else {
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
    } else {
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
    } else {
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
    } else {
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
    } else {
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
    } else {
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
    } else {
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
    } else {
      let discLocation = {
        row: rowIterator,
        column: columnIterator,
      };
      couldBeAffected.push(discLocation);
    }
  }

  return affectedDiscs;
}

/**
 * This function flip black disks to white and white disks to black.
 * @param affectDiscs
 */
function flipDiscs(affectDiscs: []) {
  for (let i = 0; i < affectDiscs.length; i++) {
    let spot: { row: number; column: number } = affectDiscs[i];

    if (discs[spot.row][spot.column] == 1) {
      discs[spot.row][spot.column] = 2;
    } else {
      discs[spot.row][spot.column] = 1;
    }
  }
}

/**
 * This function draw all of movement for each discs and set attribute for them.
 * Also at the end of this function we call  'allowedMovement' and drawAllowedMovement' function's.
 */
function drawDiscs() {
  discLayer.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      let value = discs[row][column];
      if (value == 0) {
      } else {
        let disc: HTMLElement = <HTMLElement>document.createElement("div");
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

/**
 * This function find all of allowed movement and put them to 'allowedDiscs'.
 * Also this function can return all allowed movement as array.
 * @returns
 */
function allowedMovement(): boolean {
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

/**
 * This function Draw All of Allowed Movement for each disc.
 */
function drawAllowedMovement() {
  discAllowedLayer.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      let value = allowedDiscs[row][column];
      if (value == 0) {
      } else {
        let disc: HTMLElement = <HTMLElement>document.createElement("div");
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

function clearTable(tabel: HTMLElement, obj: any) {
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      obj[row][column] = 0;
    }
  }
}

function Score(): { black: number; white: number } {
  let blackScore: number = 0;
  let whiteScore: number = 0;
  let value: number;
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      value = discs[row][column];
      if (value == 0) {
        /* do not anyting :) */
      } else {
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

function playSound(audioPath: string) {
  var audio = new Audio(audioPath);
  audio.play();
}

/**
 * Swich between two colors.
 */
function swichDiscs() {
  if (turn == 1) {
    turn = 2; /*white number*/
  } else {
    turn = 1;
  }
}

function AnnotationText(type: number, id: number): string {
  let output: string = "";
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
  } else {
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

/**
 * This function Save Palyer's Move.
 */
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

/**
 * This function return player's Move by Index number.
 * @param index
 */
function getMemory(index: number) {
  let discmemo = gameMemory[index];
  let couter: number = 0;
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      couter += 1;
      memoryDiscs[row][column] = discmemo[couter - 1];
    }
  }
}

/**
 * Draw Buttom bar.
 */
function drawtools() {
  let buttons: HTMLElement;
  buttons = <HTMLElement>document.getElementById("buttons-section");
  buttons.innerHTML = `<div id="btn-left"><button class="button-19" id="btn" role="button" onclick="getBack()">عقب</button></div>
    <div id="btn-center"><button class="button-19" role="button" onclick="reStart()">شروع مجدد</button></div>
    <div id="btn-right"><button class="button-19" id="btn" role="button" onclick="getNext()">جلو</button></div>
  `;
}

/**
 * Restart game ( ... and resets all settings. )
 */
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

/**
 * Show Previous move.
 * @returns
 */
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

/**
 * Show Next move.
 * @returns
 */
function getNext() {
  if (indexMemory == gameMemory.length - 1) {
    return;
  }
  discAllowedLayer.innerHTML = "";
  disableClick = true;
  indexMemory += 1;
  getMemory(indexMemory);
  drawMemory();
}

/**
 * This function draw game memory.
 */
function drawMemory() {
  discLayer.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      let value = memoryDiscs[row][column];
      if (value == 0) {
        // Do not anything.
      } else {
        let disc: HTMLElement = <HTMLElement>document.createElement("div");
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

/**
 * Show and Hide Some element ( in this case Show buttom's at the end of game.)
 * @param tagName
 * @param visible
 */
function elementVisibility(tagName: string, visible: boolean) {
  let element: HTMLElement = <HTMLElement>document.getElementById(tagName);
  let element2: HTMLElement = <HTMLElement>(
    document.getElementById("btn-center")
  );

  if (visible == true) {
    element.style.visibility = "visible";
    element.style.width = "20%";
    element2.style.width = "53%";
  } else {
    element.style.visibility = "hidden";
    element.style.width = "0px";
    element2.style.width = "96%";
  }
}
