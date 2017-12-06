import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../services/blogPost.service';
import { User } from '../../models/user.model';
import { BlogPost } from '../../models/blogPost.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  title = 'BlogPosts';
  users: User[];
  blogPosts: BlogPost[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
    // private userService: UserService
  ) { }

  ngOnInit(): void {
    this.blogPostService.getBlogPosts()
      .then(blogPosts => this.blogPosts = blogPosts)
      .catch(error => console.log(error));
  }


}
