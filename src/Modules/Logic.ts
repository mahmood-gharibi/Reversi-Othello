namespace OthelloReversi {
  export class Logic {
    protected _discs: any;
    protected _turn: number | undefined;

    constructor(discs: any, turn: number | undefined) {
      this._discs = discs;
      this._turn = turn;
    }

    /**
     * getAffectedDiscs
     */
    public getAffectedDiscs(row: number, column: number): any {
      /**
       * This function identifies the disks that are affected by the main movement.
       * Also we can use this function for check allowed movement.
       * For more information about this function read doc-fa.docx [persian languege].
       */

      let affectedDiscs: any[] = [];
      let couldBeAffected: any[];
      let columnIterator: number;
      let rowIterator: number;

      //Right Check :
      couldBeAffected = [];
      columnIterator = column;

      while (columnIterator < 7) {
        columnIterator += 1;
        let valueAtSpot = this._discs[row][columnIterator];

        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
        let valueAtSpot = this._discs[row][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
        let valueAtSpot = this._discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
        let valueAtSpot = this._discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
        let valueAtSpot = this._discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
        let valueAtSpot = this._discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
        let valueAtSpot = this._discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
        let valueAtSpot = this._discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == this._turn) {
          if (valueAtSpot == this._turn) {
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
  }
}
