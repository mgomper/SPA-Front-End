import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { PostService } from '../../posts/post.service';
import {Comment} from '../../shared/comment.model';
// import {User} from '../../users/user.model';


@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  id: string;
  editMode = false;
  commentForm: FormGroup;
  // user = this.userService.getUser();

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() { {
      this.postService.addComment(this.id, this.commentForm.value);
      this.postService.getPosts()
        .then(posts => {
          this.postService.postChanged.next(posts.slice());
        });
    }
    this.onCancel();
  }
  //
  // onAddIngredient() {
  //   (<FormArray>this.recipeForm.get('ingredients')).push(
  //     new FormGroup({
  //       'name': new FormControl(null, Validators.required),
  //       'amount': new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }

  // onDeleteIngredient(index: number) {
  //   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    // let editcomment = new Comment({content: ''} );

    // if (this.editMode) {
    //   this.postService.getComment(this.id)
    //     .then(comment => {
    //       editcomment = comment;
    //       this.commentForm = new FormGroup({
    //         'content': new FormControl(editcomment.content, Validators.required)
    //         // 'imagePath': new FormControl(editrecipe.imagePath, Validators.required),
    //         // 'description': new FormControl(editrecipe.description, Validators.required),
    //         // 'ingredients': recipeIngredients
    //       });
    //     })
    //     .catch(error => console.log(error));
    // }

    this.commentForm = new FormGroup({
      'content': new FormControl('', Validators.required)
      // 'comments': new FormControl('', Validators.required),
      // 'user': new FormControl('', Validators.required)
    });
  }

}
