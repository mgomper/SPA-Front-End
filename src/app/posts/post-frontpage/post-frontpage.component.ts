import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-frontpage',
  templateUrl: './post-frontpage.component.html',
  styleUrls: ['./post-frontpage.component.css']
})
export class PostFrontpageComponent implements OnInit, OnDestroy {
  private posts: Post[];
  private subscription: Subscription;

  constructor(private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.postService.postChanged
      .subscribe(
        (posts: Post[]) => {
          this.postService.getPostsFromFrontPage()
            .then(res => {
              this.posts = res;
            });
        }
      );
    this.postService.getPostsFromFrontPage().then(res => {
      this.posts = res;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
