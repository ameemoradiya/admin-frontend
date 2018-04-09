import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  iFullname;
  iUsername;
  iEmail;
  iMoreInfo;
  iAddress;
  iCompany;
  iCity;
  iZip;
  iPhone;
  user: any = {
    _id: String,
    fullname: String,
    usename: String,
    moreInfo: String,
    email: String,
    address: String,
    zip: Number,
    phone: Number,
    city: String
  };

  constructor(private userService: UserService,
    private ac: ActivatedRoute,
    private toast: ToastrService) {

    // read the route parameter in constructor
    const self = this;
    ac.params.forEach(function (param: any) {
      self.user._id = param['id'];
    });
  }

  ngOnInit() {
    const data = { id: this.user._id };
    this.userService.getUserInfoById(data).subscribe((res) => {
      this.user = res;
    });
  }

  update = function () {
    const updateData = {
      _id: this.user._id,
      fullname: this.user.fullname,
      username: this.user.username,
      moreInfo: this.user.moreInfo,
      email: this.user.email,
      phone: this.user.phone,
      zip: this.user.zip,
      company: this.user.company,
      address: this.user.address,
      city: this.user.city
    };

    this.userService.updateUserInfo(updateData).subscribe((response) => {
      if (response) {
        this.toast.success('Successfully!', 'Update!');
        this.iFullname = false;
        this.iUsername = false;
        this.iEmail = false;
        this.iMoreInfo = false;
        this.iCompany = false;
        this.iAddress = false;
        this.iCity = false;
        this.iZip = false;
        this.iPhone = false;
      }
    });

  };

}
