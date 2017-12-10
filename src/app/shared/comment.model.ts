import {User} from '../users/user.model';
import {Post} from '../posts/post.model';

export class Comment {

  private id: string;
  private _content: string;
  private _post: Post;
  private _user: User;
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

  public get post(): Post {
    return this._post;
  }

  public set post(n: Post) {
    this._post = n;
  }

  public get content(): string {
    return this._content;
  }

  public set content(n: string) {
    this._content = n;
  }


  public get user(): User {
    return this._user;
  }

  public set comments(i: User) {
    this._user = i;
  }

}
