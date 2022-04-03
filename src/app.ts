/// <reference path="Modules/Game.ts" />

namespace App {
  let othello = new OthelloReversi.Game(40, 12, 10.5);
  let div: any;
  export function init() {
    div = othello.init("container");
    othello.drawBoard(div.GameBoardLayer);
    othello.drawDiscs(div.DiscLayer);
    othello.CalcAllowedMovement();
    othello.drawAllowedMovement(div.AllowedDiscLayer);
  }

  export function clickSquare(row: number, column: number) {
    if (othello.canClickSpot(row, column) == true) {
      othello.MoveDiscs(row, column);
      othello.playSound("./sound/click.wav");
      let ChekSituation = othello.CalcAllowedMovement();
      if (ChekSituation == false) {
        othello.swichDiscs();
        if (othello.CalcAllowedMovement() == false) {
          console.log("The End :)))))))))");
          let score = othello.Score();

          if (score.white > score.black) {
            console.log(
              `white is : ${score.white} and black is : ${score.black}`
            );
            console.log("White is Winer!");
          } else if (score.white < score.black) {
            console.log(
              `white is : ${score.white} and black is : ${score.black}`
            );
            console.log("Black is Winer!");
          } else {
            console.log(
              `white is : ${score.white} and black is : ${score.black}`
            );
            console.log("Draw game :)");
          }
          init();
          return;
        }
      }
      init();
      let score = othello.Score();
      console.log(`white is : ${score.white} and black is : ${score.black}`);
    }
  }
}
