import {Comment} from '../shared/comment.model';
import {Post} from '../posts/post.model';

export class User {

  private id: string;
  private _description: string;
  private _username: string;
  private _comments: Comment[];
  private _posts: Post[];
  private _userScore: number;
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

  public get username(): string {
    return this._username;
  }

  public set username(n: string) {
    this._username = n;
  }

  public get description(): string {
    return this._description;
  }

  public set description(n: string) {
    this._description = n;
  }


  public get comments(): Comment[] {
    return this._comments;
  }

  public set comments(i: Comment[]) {
    this._comments = i;
  }

  public get posts(): Post[] {
    return this._posts;
  }

  public set posts(i: Post[]) {
    this._posts = i;
  }

  public get user_score(): number {
    return this._userScore;
  }

  public set user_score(i: number) {
    this._userScore = i;
  }
}
