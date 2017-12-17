import { Component } from '@angular/core';
import {UserService} from '../users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService) {
  }
  varTest() {
    this.userService.test = 'Hoera, het is gelukt';
    // ALS ARGUMENT USERID MEEGEVEN
  }
}
