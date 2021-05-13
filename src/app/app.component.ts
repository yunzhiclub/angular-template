import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blockchain';
  login = false;
  init = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.initCurrentLoginUser()
      .subscribe(user => {
        this.login = user !== null;
        this.init = true;
      });
  }
}
