import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import {Comment} from '../../shared/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post = new Post();
  id: string;
  @Output() commentSelected = new EventEmitter<void>();


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
            console.dir(res);
            console.dir(res._id);
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
    // this.router.navigate(['blogPosts/' + this.id + '/comment']);
    this.router.navigate(['comment'], {relativeTo: this.route});
  }

  onDeleteComment(comment) {
    this.postService.deleteComment(this.id, comment._id);
    this.router.navigate(['/blogPosts']);

  }
}
