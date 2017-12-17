import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import {Comment} from '../../shared/comment.model';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../users/user.model';
import {UserService} from '../../users/user.service';
import {StringifyOptions} from 'querystring';

interface INote {
  note: String;
  noteMessage: string;
}

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit, INote {
  post: Post = new Post();
  noteMessage = 'Enter your note here.';
  note = 'Note here';
  user: User = new User();
  postUser: User = new User();
  postUserId: String;
  private id: string;
  @Output() private commentSelected = new EventEmitter<void>();
  private subscription: Subscription;



  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.postService.getPost(this.id).then(res => {
            console.log('log de user' + res.user);
            this.post = res;
            this.postUserId = res.user;
          })
            .then(() => {
              this.userService.getSomeUser(this.postUserId).then(res => {
                console.dir(res);
                this.postUser = res;
              });
            })
            .then(() => {
              this.userService.getUser().then(res => {
                console.dir(res);
                this.user = res;
              });
            });
        }
      );
    this.subscription = this.postService.spostChanged
      .subscribe(
        (posts: Post) => {
          this.postService.getPost(this.id).then(res => {
            console.log('log de user' + res.user);
            this.post = res;
            this.postUserId = res.user;
          })
            .then(() => {
              this.userService.getSomeUser(this.postUserId).then(res => {
                console.dir(res);
                this.postUser = res;
              });
            })
            .then(() => {
              this.userService.getUser().then(res => {
                console.dir(res);
                this.user = res;
              });
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

  toFrontPage() {
    this.postService.addToFrontPage(this.id, this.user._id);
  }

  onIncreaseComment(comment) {
    this.postService.increaseComment(this.id, comment._id);
  }
  onDecreaseComment(comment) {
    this.postService.decreaseComment(this.id, comment._id);

  }
}
