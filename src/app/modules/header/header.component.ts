import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  baseurl = 'http://localhost:8000';
  pic: any;
  data: any = { username: '', _id: '', uploadImgName: '' };

  constructor(private userService: UserService,
    private router: Router,
    public localStrgService: LocalstorageService) {
  }

  ngOnInit() {
    if (localStorage.getItem('Authorization')) {
      this.userService.getCurrentUser().subscribe(response => {
        this.data = response;
      });
      setTimeout(() => {
        const data = { id: this.data._id };
        this.userService.getUserInfoById(data).subscribe((res) => {
          this.data = res;
          this.data.uploadImgName = `${this.baseurl}/profilePhotos/${res.uploadImgName}`;
          this.userService.changeData(this.data);
        });
        this.userService.currentUser.subscribe((response) => {
          if (response.uploadImgName === `${this.baseurl}/profilePhotos/`) {
            response.uploadImgName = `${this.baseurl}/profilePhotos/test-img.png`;
          }
          this.data = response;
        });
      }, 500);

    }
  }

  logout(): void {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('uploadImgName');
    this.userService.changeData({ username: '' });
    this.router.navigate(['login']);
  }

}
