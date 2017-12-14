import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../post.model';

@Component({
  selector: 'app-post-frontpage-item',
  templateUrl: './post-frontpage-item.component.html',
  styleUrls: ['./post-frontpage-item.component.css']
})
export class PostFrontpageItemComponent implements OnInit {
  @Input() private post: Post;
  @Input() private index: string;

  ngOnInit() {
    this.index = this.post._id;
  }

}
