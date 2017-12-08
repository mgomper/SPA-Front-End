import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Post } from '../../post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() index: string;
  @Output() postSelected = new EventEmitter<void>();

  ngOnInit() {
    this.index = this.post._id;
  }

  onSelected() {
    this.postSelected.emit();
  }
}
