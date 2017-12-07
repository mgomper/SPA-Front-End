import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';
import {Post} from './post.model';
import {Comment} from '../shared/comment.model';

@Injectable()
export class PostService {
  postChanged = new Subject<Post[]>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/blogPosts/'; // URL to web api
  private posts: Post[];

  constructor(private http: Http) {
  }

  getPosts() {
    console.log('Fetching BlogPosts from database.')
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.posts = response.json() as Post[];
        return response.json() as Post[];
      })
      .catch(error => {
        return error;
      });
  }

  getPost(index: string) {
    console.log('Fetching individual BlogPost from database.')
    if (index == null)
      return null;
    return this.http.get(this.serverUrl + index, {headers: this.headers})
      .toPromise()

      .then(response => {
        return response.json().blogPost[0];
      })
      .catch(error => {

        return error;
      });
  }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredients(ingredients);
  // }

  addPost(post: Post) {
    return this.http.post(this.serverUrl, post, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      });
  }

  updatePost(index: string, newPost: Post) {
    return this.http.put(this.serverUrl + index, newPost, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      });
  }

  deletePost(index: string) {
    return this.http.delete(this.serverUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      });
  }
}
