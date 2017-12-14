import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-ranking',
  templateUrl: './post-ranking.component.html',
  styleUrls: ['./post-ranking.component.css']
})
export class PostRankingComponent implements OnInit, OnDestroy {
  posts: Post[];
  private subscription: Subscription;

  constructor(private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.postService.postChanged
      .subscribe(
        (posts: Post[]) => {
          this.postService.getPosts()
            .then(res => {
              this.posts = res;
            });
        }
      );
    this.postService.getPostsSortedByRating().then(res => {
      this.posts = res;
    });
  }

  onNewPost() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
