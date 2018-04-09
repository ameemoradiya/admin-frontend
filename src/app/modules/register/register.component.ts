import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
    moreInfo: '',
    status: false,
    gRecaptchaResponse: ''
  };

  constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  register(userinfo) {
    this.userService.register(userinfo, this.user.status).subscribe((response) => {
      this.toastrService.success('Successfully!', 'Register!');
      this.router.navigate(['login']);
    });
  }

  resolved(captchaResponse: string) {
    this.user.gRecaptchaResponse = captchaResponse;
  }

}
