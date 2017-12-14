import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../post.model';

@Component({
  selector: 'app-post-ranking-item',
  templateUrl: './post-ranking-item.component.html',
  styleUrls: ['./post-ranking-item.component.css']
})
export class PostRankingItemComponent implements OnInit {
  @Input() private post: Post;
  @Input() private index: string;

  ngOnInit() {
    this.index = this.post._id;
  }

}
