namespace OthelloReversi {
  export class Game {
    // Game Board Size Variable.
    protected _gameboardSize: number; //percent
    protected _squareSize: number; //percent
    protected _gap: number; //percent
    protected _discSize: number; //percent
    protected _discgap: number; //percent

    ///Game Vriable.
    protected _discs: any = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    protected _allowedDiscs: any = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    protected _turn: number | undefined = 1;

    /**
     *
     * @param boardSize
     * @param squareSize
     * @param discSize
     */
    constructor(boardSize: number, squareSize: number, discSize: number) {
      this._gameboardSize = boardSize;
      this._squareSize = squareSize;
      this._discSize = discSize;
      this._gap = (100 - squareSize * 8) / 9; //percent
      this._discgap = (100 - discSize * 8) / 9; //percent
    }

    /**
     *
     * @param id
     * @returns
     */
    public init(id: string): {
      GameBoardLayer: string;
      DiscLayer: string;
      AllowedDiscLayer: string;
    } {
      let container: HTMLElement = <HTMLElement>document.getElementById(id);

      container.innerHTML = "";

      let element1: HTMLElement = <HTMLElement>document.createElement("div");
      element1.setAttribute("id", "gameBoard");
      container.appendChild(element1);

      let element2: HTMLElement = <HTMLElement>document.createElement("div");
      element2.setAttribute("id", "discAllowedMovement");
      container.appendChild(element2);

      let element3: HTMLElement = <HTMLElement>document.createElement("div");
      element3.setAttribute("id", "discLayer");
      container.appendChild(element3);

      let element4: HTMLElement = <HTMLElement>document.createElement("div");
      element4.setAttribute("id", "coverLayer");
      element4.style.opacity = "0";
      container.appendChild(element4);

      return {
        GameBoardLayer: "gameBoard",
        DiscLayer: "discLayer",
        AllowedDiscLayer: "discAllowedMovement",
      };
    }

    /**
     * Draw You'r game board. You just need use <div> id name to do it.
     * @param id
     */
    public drawBoard(id: string) {
      let gameBoard: HTMLElement = <HTMLElement>document.getElementById(id);
      gameBoard.style.width = this._gameboardSize + "%";
      gameBoard.style.height = "0";
      gameBoard.style.paddingBottom = this._gameboardSize + "%";
      gameBoard.style.position = "absolute";

      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          let greenSquare: HTMLElement = <HTMLElement>(
            document.createElement("div")
          );
          greenSquare.setAttribute("id", "greenSquare");
          greenSquare.style.position = "absolute";
          greenSquare.style.width = this._squareSize + "%";
          greenSquare.style.paddingBottom = this._squareSize + "%";
          greenSquare.style.left =
            (this._squareSize + this._gap) * column + this._gap + "%";
          greenSquare.style.top =
            (this._squareSize + this._gap) * row + this._gap + "%";
          gameBoard.appendChild(greenSquare);
        }
      }
    }

    /**
     * Draw You'r _discs:  You just need use <div> id name to do it.
     * @param id
     */
    public drawDiscs(id: string) {
      let discLayer: HTMLElement = <HTMLElement>document.getElementById(id);
      discLayer.style.width = this._gameboardSize + "%";
      discLayer.style.height = "0";
      discLayer.style.paddingBottom = this._gameboardSize + "%";
      discLayer.style.position = "absolute";

      discLayer.innerHTML = "";

      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          let value = this._discs[row][column];
          if (value == 0) {
          } else {
            let disc: HTMLElement = <HTMLElement>document.createElement("div");
            disc.setAttribute("id", "disc");
            disc.style.position = "absolute";
            disc.style.width = this._discSize + "%";
            disc.style.height = this._discSize + "%";
            disc.style.left =
              (this._discSize + this._discgap) * column + this._discgap + "%";
            disc.style.top =
              (this._discSize + this._discgap) * row + this._discgap + "%";
            disc.style.borderRadius = "50%";
            if (value == 1) {
              disc.style.background =
                "radial-gradient(circle,rgba(48, 48, 48, 1) 0%,rgba(0, 0, 0, 1) 100%)";
            }
            if (value == 2) {
              disc.style.background =
                "radial-gradient(circle,rgba(255, 255, 255, 1) 0%,rgba(178, 178, 178, 1) 100%)";
            }
            discLayer.appendChild(disc);
          }
        }
      }
    }

    /**
     *
     * @param id
     */
    public drawAllowedMovement(id: string) {
      let allowedMovementLayer: HTMLElement = <HTMLElement>(
        document.getElementById(id)
      );
      allowedMovementLayer.style.width = this._gameboardSize + "%";
      allowedMovementLayer.style.height = "0";
      allowedMovementLayer.style.paddingBottom = this._gameboardSize + "%";
      allowedMovementLayer.style.position = "absolute";

      allowedMovementLayer.innerHTML = "";

      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          let value = this._allowedDiscs[row][column];
          if (value == 0) {
          } else {
            let disc: HTMLElement = <HTMLElement>document.createElement("div");
            disc.setAttribute("id", "allowedMovement");
            disc.style.position = "absolute";
            disc.style.width = this._discSize + "%";
            disc.style.height = this._discSize + "%";
            disc.style.left =
              (this._discSize + this._discgap) * column + this._discgap + "%";
            disc.style.top =
              (this._discSize + this._discgap) * row + this._discgap + "%";
            disc.style.borderRadius = "50%";
            disc.style.backgroundColor = "rgba(10, 10, 10, 0.2)";
            allowedMovementLayer.appendChild(disc);
          }
        }
      }
      this.drawCoverClick("coverLayer");
    }
    /**
     *
     * @param id
     */
    protected drawCoverClick(id: string) {
      let coverClickLayer: HTMLElement = <HTMLElement>(
        document.getElementById(id)
      );
      coverClickLayer.style.width = this._gameboardSize + "%";
      coverClickLayer.style.height = "0";
      coverClickLayer.style.paddingBottom = this._gameboardSize + "%";
      coverClickLayer.style.position = "absolute";
      coverClickLayer.innerHTML = "";

      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          let value = this._allowedDiscs[row][column];
          if (value == 0) {
          } else {
            let disc: HTMLElement = <HTMLElement>document.createElement("div");
            disc.setAttribute("id", "coverSquare");
            disc.style.position = "absolute";
            disc.style.width = this._squareSize + "%";
            disc.style.height = this._squareSize + "%";
            disc.style.left =
              (this._squareSize + this._gap) * column + this._gap + "%";
            disc.style.top =
              (this._squareSize + this._gap) * row + this._gap + "%";
            disc.style.backgroundColor = "black";
            disc.setAttribute(
              "onclick",
              "App.clickSquare(" + row + "," + column + ")"
            );

            coverClickLayer.appendChild(disc);
          }
        }
      }
    }

    /**
     *
     * @param row
     * @param column
     * @returns
     */
    public canClickSpot(row: number, column: number): boolean {
      // This function check allowed movement.
      let _ruls = new OthelloReversi.Logic(this._discs, this._turn);
      let affectedDiscs = _ruls.getAffectedDiscs(row, column);
      if (affectedDiscs.length == 0) {
        return false;
      } else {
        return true;
      }
    }

    /**
     *
     * @param affectDiscs
     */
    public flipDiscs(affectDiscs: []) {
      //This function flip black disks to white and white disks to black.
      for (let i = 0; i < affectDiscs.length; i++) {
        let spot: { row: number; column: number } = affectDiscs[i];

        if (this._discs[spot.row][spot.column] == 1) {
          this._discs[spot.row][spot.column] = 2;
        } else {
          this._discs[spot.row][spot.column] = 1;
        }
      }
    }

    /**
     *
     * @param row
     * @param column
     */
    public MoveDiscs(row: number, column: number) {
      let _ruls = new OthelloReversi.Logic(this._discs, this._turn);
      let affectedDiscs = _ruls.getAffectedDiscs(row, column);
      this.flipDiscs(affectedDiscs);
      this._discs[row][column] = this._turn;

      if (this._turn == 1) {
        this._turn = 2;
      } else {
        this._turn = 1;
      }
    }

    /**
     *
     * @returns
     */
    public CalcAllowedMovement(): boolean {
      let movement: boolean = false;
      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          this._allowedDiscs[row][column] = 0;
          if (this._discs[row][column] == 0) {
            if (this.canClickSpot(row, column) == true) {
              this._allowedDiscs[row][column] = 1;
              movement = true;
            }
          }
        }
      }
      return movement;
    }

    /**
     * swichDiscs
     */
    public swichDiscs() {
      /*swich between tow colors */
      if (this._turn == 1) {
        this._turn = 2; /*white number*/
      } else {
        this._turn = 1;
      }
    }

    /**
     *
     * @returns
     */
    public Score(): { black: number; white: number } {
      let blackScore: number = 0;
      let whiteScore: number = 0;
      let value: number;
      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          value = this._discs[row][column];
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

    /**
     *
     * @param audioPath
     */
    public playSound(audioPath: string) {
      var audio = new Audio(audioPath);
      audio.play();
    }
  }
}
