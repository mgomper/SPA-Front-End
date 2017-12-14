import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostStartComponent } from './posts/post-start/post-start.component';
import { PostItemComponent } from './posts/post-list/post-item/post-item.component';
import {PostService} from './posts/post.service';
import { CommentsComponent } from './comments/comments.component';
import { CommentEditComponent } from './comments/comment-edit/comment-edit.component';
import {UserService} from './users/user.service';
import { UsersComponent } from './users/users.component';
import { UserThisComponent } from './users/user-this/user-this.component';
import { UserRankingComponent } from './users/user-ranking/user-ranking.component';
import { PostRankingComponent } from './posts/post-ranking/post-ranking.component';
import { PostRankingItemComponent } from './posts/post-ranking/post-ranking-item/post-ranking-item.component';
import { PostFrontpageComponent } from './posts/post-frontpage/post-frontpage.component';
import { PostFrontpageItemComponent } from './posts/post-frontpage/post-frontpage-item/post-frontpage-item.component';
import { WipComponent } from './wip/wip.component';
import {NoteDirective} from './shared/note.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PostsComponent,
    PostDetailComponent,
    PostEditComponent,
    PostListComponent,
    PostStartComponent,
    PostItemComponent,
    CommentsComponent,
    CommentEditComponent,
    UsersComponent,
    UserThisComponent,
    UserRankingComponent,
    PostRankingComponent,
    PostRankingItemComponent,
    PostFrontpageComponent,
    PostFrontpageItemComponent,
    WipComponent,
    NoteDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
