export class Comment {

  private _content: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get content(): string {
    return this._content;
  }

  public set content(n: string) {
    this._content = n;
  }
}
