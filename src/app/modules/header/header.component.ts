import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  data: any = { username: '', _id: '' };

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('Authorization')) {
      this.userService.getCurrentUser().subscribe(response => {
        this.data = response;
        this.userService.changeData(this.data);
      });
      this.userService.currentUser.subscribe((response) => {
        this.data = response;
      });
    }
  }

  logout(): void {
    localStorage.removeItem('Authorization');
    this.userService.changeData({ username: '' });
    this.router.navigate(['login']);
  }

}
