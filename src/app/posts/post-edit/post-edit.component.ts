import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { PostService } from '../post.service';
import {Post} from '../post.model';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: string;
  editMode = false;
  postForm: FormGroup;

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

  onSubmit() {
    if (this.editMode) {
      this.postService.updatePost(this.id, this.postForm.value);
    } else {
      this.postService.addPost(this.postForm.value);
      this.postService.getPosts()
        .then(recipes => {
          this.postService.postChanged.next(recipes.slice());
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
    let editpost = new Post({content: ''});

    if (this.editMode) {
      this.postService.getPost(this.id)
        .then(post => {
          editpost = post;
          this.postForm = new FormGroup({
            'content': new FormControl(editpost.content, Validators.required)
            // 'imagePath': new FormControl(editrecipe.imagePath, Validators.required),
            // 'description': new FormControl(editrecipe.description, Validators.required),
            // 'ingredients': recipeIngredients
          });
        })
        .catch(error => console.log(error));
    }

    this.postForm = new FormGroup({
      'content': new FormControl('', Validators.required)
      // 'comments': new FormControl('', Validators.required),
      // 'user': new FormControl('', Validators.required)
    });
  }

}
