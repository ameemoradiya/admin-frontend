import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  baseurl = 'http://localhost:8000/user';
  admbaseurl = 'http://localhost:8000/admin/user';

  uData = { username: '', _id: '', token: '', uploadImgName: '' };
  public username = new BehaviorSubject<string>('');
  public logindata = new BehaviorSubject(this.uData);
  currentUser = this.logindata.asObservable();

  constructor(private httpClient: HttpClient) { }

  changeData(uData) {
    this.logindata.next(uData);
  }

  // User Login
  logIn(user): Observable<any> {
    return this.httpClient.post(`${this.baseurl}/logIn`, user).map(response => {
      return response;
    });
  }

  // User Registeration
  register(user, ustatus) {
    const userRegData = {
      'username': user.username,
      'email': user.email,
      'password': user.password,
      'moreInfo': user.moreInfo,
      'gRecaptchaResponse': user.gRecaptchaResponse,
      'status': ustatus
    };
    return this.httpClient.post(`${this.baseurl}/register`, userRegData);
  }
  /* get current userinfo */
  getCurrentUser(): Observable<any> {
    return this.httpClient.post(`${this.baseurl}/getCurrentUser`, {}).map(response => {
      return response;
    });
  }

  /* update one profile */
  updateUserInfo(param) {
    return this.httpClient.put(`${this.baseurl}/update`, param).map(response => {
      return response;
    });
  }

  /* get one profile */
  getUserInfoById(param): any {
    return this.httpClient.post(`${this.baseurl}/getById`, param).map(response => {
      return response;
    });
  }

  /* get one profile */
  resetPassword(param) {
    return this.httpClient.post(`${this.admbaseurl}/resetPassword`, param).map(response => {
      return response;
    });
  }

  updateOneAffiliate(param) {
    return this.httpClient.put(`${this.admbaseurl}/update`, param).map(response => {
      return response;
    });
  }

  getAllForAffiliatesTable(dataTablesParameters, perpage, search: any): Observable<any> {
    let pagenumber, page, sortColumn, count = -1;
    dataTablesParameters.columns.forEach(element => {
      count++;
      if (dataTablesParameters.order[0].column === count) {
        sortColumn = dataTablesParameters.columns[count].name;
      }
    });

    page = dataTablesParameters.start / dataTablesParameters.length;
    if (page >= 0) { pagenumber = page + 1; }
    const setdata = {
      'pagenumber': pagenumber,
      'perpage': perpage,
      'sortColumn': sortColumn,
      'sortType': dataTablesParameters.order[0].dir,
      'search': search
    };
    return this.httpClient.post(`${this.admbaseurl}/getAllForAffiliatesTable`, setdata).map(response => {
      return response;
    });
  }

  deleteUser(user_id) {
    return this.httpClient.delete(`${this.admbaseurl}/Delete/${user_id}`).map(response => {
      return response;
    });
  }

  deleteImg(user): any {
    console.log(user);

    return this.httpClient.put(`http://localhost:8000/user/uploadImage/delete/${user._id}`, {}).map(response => {
      return response;
    });
  }

}
