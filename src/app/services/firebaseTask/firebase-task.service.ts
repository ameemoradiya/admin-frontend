import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Task } from './task';
import { QueryFn } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseTaskService {
  private dbPath = '/tasks';
  taskRef: AngularFireList<Task> = null;

  constructor(private db: AngularFireDatabase, private httpClient: HttpClient) {
    this.taskRef = db.list(this.dbPath);
  }

  getTaskList(): Observable<any> {
    return this.httpClient.post(`http://localhost:8000/tasks/getAll`, {}).map(response => {
      return response;
    });
  }

  deleteTask(key: string) {
    return this.httpClient.delete(`http://localhost:8000/tasks/delete/${key}`).map(response => {
      return response;
    });
  }

  createTask(addtask: Task) {
    return this.httpClient.post(`http://localhost:8000/tasks/TaskSet`, addtask).map(response => {
      return response;
    });
  }

  updateTask(key: string, value: any) {
    return this.httpClient.put(`http://localhost:8000/tasks/update/${key}`, value).map(response => {
      return response;
    });
  }

  toggleDone(key: string, value: any) {
    return this.httpClient.put(`http://localhost:8000/tasks/update/${key}`, value).map(response => {
      return response;
    });
  }

  private handleError(error) {
    console.log(error);
  }
}

