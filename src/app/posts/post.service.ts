import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';
import {Post} from './post.model';
import {Comment} from '../shared/comment.model';

@Injectable()
export class PostService {
  postChanged = new Subject<Post[]>();
  spostChanged = new Subject<Post>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/blogPosts/'; // URL to web api
  private posts: Post[];
  private post: Post;
  private comments: Comment[];


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

  getPostsSortedByRating() {
    console.log('Fetching BlogPosts from database.')
    return this.http.get(this.serverUrl + 'filter/rating', {headers: this.headers})
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
    if (index == null) {
      console.log('null');
      return null;
    }
    return this.http.get(this.serverUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log('post service');
        console.dir(response);
        return response.json()[0] as Post;
      })
      .catch(error => {
        return this.handleError(error);
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
      })
      .catch(error => {
        console.log(error);
        alert('Please make sure your form input is correct.');
      });
  }

  addComment(index: string, comment: Comment) {
    return this.http.put(this.serverUrl + index + '/comment', comment, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      })
      .catch(error => {
        console.log(error);
        alert('Please make sure your form input is correct.' + error);
      });
  }

  updatePost(index: string, newPost: Post) {
    return this.http.put(this.serverUrl + index, newPost, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      });
  }

  increasePost(index: string) {
    return this.http.put(this.serverUrl + index + '/incr', {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      });
  }

  decreasePost(index: string) {
    return this.http.put(this.serverUrl + index + '/decr', {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      });
  }

  increaseComment(index: string, indexm: string) {
    return this.http.put(this.serverUrl + index + '/commentinc/' + indexm, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.spostChanged.next(this.post);
      });
  }

  decreaseComment(index: string, indexm: string) {
    return this.http.put(this.serverUrl + index + '/commentdec/' + indexm, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.spostChanged.next(this.post);
      });
  }

  deletePost(index: string) {
    return this.http.delete(this.serverUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.postChanged.next(this.posts.slice());
      });
  }

  deleteComment(index: string, indexm: string) {
    return this.http.delete(this.serverUrl + index + '/comment/' + indexm, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.spostChanged.next(this.post);
      });
  }

  addToFrontPage(index: string) {
    return this.http.post(this.serverUrl + 'frontpage/' + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.spostChanged.next(this.post);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
