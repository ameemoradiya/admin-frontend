import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseTaskService {
  baseurl = 'http://localhost:8000/tasks';

  constructor(private httpClient: HttpClient) { }

  getTaskList(): Observable<any> {
    return this.httpClient.post(`${this.baseurl}/getAll`, {}).map(response => {
      return response;
    });
  }

  deleteTask(key: string) {
    return this.httpClient.delete(`${this.baseurl}/delete/${key}`).map(response => {
      return response;
    });
  }

  createTask(addtask: Task) {
    return this.httpClient.post(`${this.baseurl}/TaskSet`, addtask).map(response => {
      return response;
    });
  }

  updateTask(key: string, value: any) {
    return this.httpClient.put(`${this.baseurl}/update/${key}`, value).map(response => {
      return response;
    });
  }

  private handleError(error) {
    console.log(error);
  }
}

