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
  private id: string;
  private userId: string;
  private editMode = false;
  postForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          console.log('userId: ' + this.userId);
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
    this.userService.getUser().then(res => {
      this.user = res;
      this.userId = res._id;
      console.dir(this.userId);
    });

    console.log('test');
    console.log(this.userService.getUser());
    console.log(this.userService.getUser());
  }

  onSubmit() {
    if (this.editMode) {
      this.postForm.patchValue({user: this.userId});
      this.postService.updatePost(this.id, this.postForm.value);
    } else {
      this.postForm.patchValue({user: this.userId});
      this.postService.addPost(this.postForm.value);
      this.postService.getPosts()
        .then(recipes => {
          this.postService.postChanged.next(recipes.slice());
        });
    }
    this.onCancel();
  }

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
              'user': new FormControl(edituser.username, Validators.required)
            });
          });
        })
        .catch(error => {
          console.log(error);
          alert('Please make sure your form input is correct.');
        });
    }

    this.userService.getUser()
      .then(res => {
      edituser = res;
        console.log('before then');
        console.dir(edituser);
        console.dir(edituser._id);
      })
      .then()
    this.postForm = new FormGroup({
      'content': new FormControl('Your content here', Validators.required),
      'title': new FormControl('Your title here', Validators.required),
      'user': new FormControl(edituser.username || 'not logged in', Validators.required)

    });
    console.log('after then');
    console.dir(edituser);
  }

}
