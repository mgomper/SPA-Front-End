import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { PostStartComponent } from './posts/post-start/post-start.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostRankingComponent } from './posts/post-ranking/post-ranking.component';
import { PostFrontpageComponent } from './posts/post-frontpage/post-frontpage.component';

import { CommentEditComponent } from './comments/comment-edit/comment-edit.component';

import {UsersComponent} from './users/users.component';
import {UserThisComponent} from './users/user-this/user-this.component';
import {UserRankingComponent} from './users/user-ranking/user-ranking.component';

import {WipComponent} from './wip/wip.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/blogPosts', pathMatch: 'full' },
  { path: 'blogPosts', component: PostsComponent, children: [
      { path: '', component: PostStartComponent },
      { path: 'new', component: PostEditComponent },
      { path: 'ranking', component: PostRankingComponent},
      { path: 'frontpage', component: PostFrontpageComponent},
      { path: ':id', component: PostDetailComponent },
      { path: ':id/edit', component: PostEditComponent },
      { path: ':id/comment', component: CommentEditComponent },
    ] },
  { path: 'users', component: UsersComponent, children: [
      { path: 'this', component: UserThisComponent},
      { path: 'ranking', component: UserRankingComponent}
    ] },
  { path: 'wip', component: WipComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
