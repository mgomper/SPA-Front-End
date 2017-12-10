import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { PostService } from '../post.service';
import { UserService } from '../../users/user.service';
import {Post} from '../post.model';
import {User} from '../../users/user.model';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: string;
  userId: string;
  editMode = false;
  postForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    // this.user = this.userService.getUser();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          // this.userId = '5a2be3df8dfea75d94b31343';
          console.log('userId: ' + this.userId);
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
    console.log('test');
    console.log(this.userService.getUser());
    console.log(this.userService.getUser());

    // this.userService.getUser().then(res => {
    //   console.log('user data incoming');
    //   console.dir(res);
    //   console.dir(res._id);
    //   this.user = res;
    //   this.userId = res._id;
    //   console.log('user ID incoming');
    //   console.dir(this.userId);
    // });
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
    let edituser = new User();


    if (this.editMode) {
      this.userService.getUser()
        .then(user => {
          edituser = user;
        this.postService.getPost(this.id)
          .then(post => {
            editpost = post;
            this.postForm = new FormGroup({
              'content': new FormControl(editpost.content, Validators.required),
              'title': new FormControl(editpost.title, Validators.required),
              'user': new FormControl(edituser._id, Validators.required)
              // 'imagePath': new FormControl(editrecipe.imagePath, Validators.required),
              // 'description': new FormControl(editrecipe.description, Validators.required),
              // 'ingredients': recipeIngredients
            });
          });
      })
        .catch(error => {
          console.log(error);
          alert('Please make sure your form input is correct.');
        });
    }

    this.userService.getUser().then(res => {
      edituser = res;
    })
      .then()
    this.postForm = new FormGroup({
      'content': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'user': new FormControl(edituser._id || 'Not logged in', Validators.required)
      // 'comments': new FormControl('', Validators.required),
      // 'user': new FormControl('', Validators.required)
    });
  }

}
