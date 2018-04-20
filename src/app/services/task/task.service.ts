import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) { }
  baseurl = 'http://localhost:8000/task';

  getTodoList(dataTablesParameters, perpage, search: any): Observable<any> {
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

    return this.httpClient.post(`${this.baseurl}/getAll`, setdata).map(response => {
      return response;
    });
  }

  addTodo(todo): Observable<any> {
    return this.httpClient.post(`${this.baseurl}/TaskSet`, todo);
  }

  deleteTodo(todo_id) {
    return this.httpClient.delete(`${this.baseurl}/Delete/${todo_id}`);
  }

  toggleDone(todo) {
    return this.httpClient.put(`${this.baseurl}/Complete/${todo._id}`, todo);
  }

  updateTodo(todo) {
    return this.httpClient.put(`${this.baseurl}/Update/${todo.id}`, todo);
  }

  private handleError(error) {
    console.log(error);
  }
}
