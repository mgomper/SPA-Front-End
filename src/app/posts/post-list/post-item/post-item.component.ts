import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Post } from '../../post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../users/user.service';
import {PostService} from '../../post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() index: string;
  @Output() postSelected = new EventEmitter<void>();

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }
  ngOnInit() {
    this.index = this.post._id;
  }

  onSelected() {
    this.postSelected.emit();
  }

  onIncreasePost() {
    this.postService.increasePost(this.index);
    // this.router.navigate(['/blogPosts']);
  }

  onDecreasePost() {
    this.postService.decreasePost(this.index);
    // this.router.navigate(['/blogPosts']);
  }
}
