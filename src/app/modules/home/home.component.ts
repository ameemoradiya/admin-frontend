import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = {
    username: '',
    _id: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((response) => {
      this.data = response;
    });
    this.userService.changeData(this.data);
  }
}
