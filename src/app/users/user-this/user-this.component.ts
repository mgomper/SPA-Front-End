import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../posts/post.service';
import {User} from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-this',
  templateUrl: './user-this.component.html',
  styleUrls: ['./user-this.component.css']
})
export class UserThisComponent implements OnInit {
  user: User;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userService.getUser().then(res => {
            console.dir(res);
            console.dir(res._id);
            this.user = res;
          });
        }
      );
  }



}
