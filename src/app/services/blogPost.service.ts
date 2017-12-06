import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { BlogPost } from '../models/blogPost.model';

@Injectable()
export class BlogPostService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/blogPosts'; // URL to web api
  private blogPosts: BlogPost[] = [];

  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getBlogPosts(): Promise<BlogPost[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as BlogPost[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
