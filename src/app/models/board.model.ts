export class Board {

  private _title: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get title(): string {
    return this._title;
  }

  public set title(n: string) {
    this._title = n;
  }
}
