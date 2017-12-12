
import {Comment} from '../shared/comment.model';
export class Post {

  private id: string;
  private _content: string;
  private _comments: Comment[];
  private _title: string;
  private _user: string;
  private _rating: number;
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

  public set title(n: string) {
    this._title = n;
  }

  public get title(): string {
    return this._title;
  }

  public set content(n: string) {
    this._content = n;
  }

  public get user(): string {
    return this._user;
  }

  public set user(n: string) {
    this._user = n;
  }

  public get comments(): Comment[] {
    return this._comments;
  }

  public set comments(i: Comment[]) {
    this._comments = i;
  }

  public get rating(): number {
    return this._rating;
  }

  public set rating(i: number) {
    this._rating = i;
  }


}
