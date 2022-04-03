namespace OthelloReversi {
  export class Random {
    protected _min: number = 0;
    protected _max: number = 0;

    /**
     *
     */
    constructor(min: number, max: number) {
      this._min = min;
      this._max = max;
    }

    /**
     * getRandom
     */
    public getRandomMovement(): number {
      return (
        Math.floor(Math.random() * (this._max - this._min + 1)) + this._min
      );
    }
  }
}
