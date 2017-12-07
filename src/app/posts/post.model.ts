
import {Comment} from '../shared/comment.model';
export class Post {

  private id: string;
  private _content: string;
  private _comments: Comment[];
  // private _user: User;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  public get _id(): string {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get content(): string {
    return this._content;
  }

  public set content(n: string) {
    this._content = n;
  }


  public get comments(): Comment[] {
    return this._comments;
  }

  public set comments(i: Comment[]) {
    this._comments = i;
  }

}
