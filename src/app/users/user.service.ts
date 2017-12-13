import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';
import {User} from './user.model';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/users/'; // URL to web api


  constructor(private http: Http) {

  }
//
//   // getPosts() {
//   //   console.log('Fetching BlogPosts from database.')
//   //   return this.http.get(this.serverUrl, {headers: this.headers})
//   //     .toPromise()
//   //     .then(response => {
//   //       this.posts = response.json() as Post[];
//   //       return response.json() as Post[];
//   //     })
//   //     .catch(error => {
//   //       return error;
//   //     });
//   // }
//
  getUser() {
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log('service');
        console.dir(response);
        return response.json()[0] as User;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

//
//   // addIngredientsToShoppingList(ingredients: Ingredient[]) {
//   //   this.slService.addIngredients(ingredients);
//   // }
//
//   // addPost(post: Post) {
//   //   return this.http.post(this.serverUrl, post, {headers: this.headers})
//   //     .toPromise()
//   //     .then(response => {
//   //       this.postChanged.next(this.posts.slice());
//   //     });
//   // }
//   //
//   // updatePost(index: string, newPost: Post) {
//   //   return this.http.put(this.serverUrl + index, newPost, {headers: this.headers})
//   //     .toPromise()
//   //     .then(response => {
//   //       this.postChanged.next(this.posts.slice());
//   //     });
//   // }
//   //
//   // deletePost(index: string) {
//   //   return this.http.delete(this.serverUrl + index, {headers: this.headers})
//   //     .toPromise()
//   //     .then(response => {
//   //       this.postChanged.next(this.posts.slice());
//   //     });
//   // }
//
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
 }
