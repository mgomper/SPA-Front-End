import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import {Comment} from '../../shared/comment.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post = new Post();
  id: string;
  @Output() commentSelected = new EventEmitter<void>();
  subscription: Subscription;



  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.postService.getPost(this.id).then(res => {
            console.log('Kijk eens aan, je hebt de subscribe van post-detail aangeroepen.');
            console.dir(res);
            this.post = res;
          });
        }
      );
    this.subscription = this.postService.spostChanged
      .subscribe(
        (posts: Post) => {
          console.log('tweede subscribe aangeroepen');
          this.postService.getPost(this.id)
            .then(res => {
              this.post = res;
            });
        }
      );
  }


  // onAddToShoppingList() {
  //   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  // }

  onEditPost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeletePost() {
    this.postService.deletePost(this.id);
    this.router.navigate(['/blogPosts']);
  }

  onNewComment() {
    this.router.navigate(['comment'], {relativeTo: this.route});
  }

  onDeleteComment(comment) {
    this.postService.deleteComment(this.id, comment._id);

  }

  onIncreaseComment(comment) {
    this.postService.increaseComment(this.id, comment._id);
  }
  onDecreaseComment(comment) {
    this.postService.decreaseComment(this.id, comment._id);

  }
}
