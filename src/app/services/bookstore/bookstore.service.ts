import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookstoreService {
  baseurl = 'http://localhost:8000/books';

  constructor(private httpClient: HttpClient) { }

  getBookList(dataTablesParameters, perpage, search: any): Observable<any> {
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
    return this.httpClient.post(`${this.baseurl}/getAll`, setdata).map((response: any) => {
      return response;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  getByFilter() {
    const data = {
      'bname': 'bname',
      'bprise': 'bprise'
    };
    return this.httpClient.post(`${this.baseurl}/getByFilter`, data);
  }

  getBookbyhighPrice(): Observable<any> {
    const setdata = {
      'pagenumber': 1,
      'perpage': 1,
      'sortColumn': 'bprice',
      'sortType': 'desc'
    };

    return this.httpClient.post(`${this.baseurl}/getAll`, setdata);
  }

  getBookById(showbyid): Observable<any> {
    const data = { 'showbyid': showbyid };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByName(bookname): Observable<any> {
    const data = { 'showbyname': bookname };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByPage(bpageno): Observable<any> {
    const data = { 'showbypage': bpageno };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByPagefilter(gpage, lpage, notequal): Observable<any> {
    const data = { 'gpage': gpage, 'lpage': lpage, 'notequal': notequal };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByzeroPage(bpagesize): Observable<any> {
    const data = { 'bpagesize': bpagesize };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByYear(year): Observable<any> {
    const data = { 'showbyyear': year };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }
  getBookByYearfilter(yr1, yr15): Observable<any> {
    const data = { 'yr1': yr1, 'yr15': yr15 };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  showbooklang(): Observable<any> {
    const data = { 'bLanguage': 'bLanguage' };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  addBook(bookdetails) {
    return this.httpClient.post(`${this.baseurl}/bookSet`, bookdetails);
  }

  deleteBookbyid(bookid) {
    const data = { 'bookid': bookid };
    return this.httpClient.delete(`${this.baseurl}/deleteById/` + bookid);
  }

  deleteBookbyName(bookname) {
    return this.httpClient.delete(`${this.baseurl}/deleteByName/` + bookname);
  }

  deleteBookbyAuthor(bookauthor) {
    return this.httpClient.delete(`${this.baseurl}/deleteByAuthor/` + bookauthor);
  }

  deleteBookbyAuthDesc(auth, desc) {
    return this.httpClient.delete(`${this.baseurl}/deleteByNameAuthor/${auth}/${desc}`);
  }

  deleteBookbyNameCate(name, category) {
    return this.httpClient.delete(`${this.baseurl}/deleteByNameCategory/${name}/${category}`);
  }

  updateBookbyid(book) {
    return this.httpClient.put(`${this.baseurl}/updateById/` + book.bookId, book);
  }

  updateBookbyname(book) {
    return this.httpClient.put(`${this.baseurl}/updateByName/` + book.bname, book);
  }

  updateBookbyNameAuthor(book) {
    return this.httpClient.put(`${this.baseurl}/updateByNameAuth/${book.bname}/${book.bauthorname}`, book);
  }


  private handleError(error) {
    console.log(error);
  }
}
