import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { BookstoreService } from '../../services/bookstore/bookstore.service';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css']
})

export class BookstoreComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tasks;
  books;
  book = {
    bookId: '',
    bname: '',
    bdescription: '',
    bauthorname: '',
    bpagenum: '',
    bcategory: '',
    bprice: '',
    breleasyear: '',
    bLanguage: ''
  };

  constructor(private bookService: BookstoreService) { }

  ngOnInit(): void {
    this.getBookData();
  }

  getBookData() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.bookService.getBookList(dataTablesParameters, dataTablesParameters.length, dataTablesParameters.search.value).
          subscribe(respons => {
            this.books = respons.data;
            this.book.bookId = respons.recordsTotal + 1;
            callback({
              recordsTotal: respons.recordsTotal,
              recordsFiltered: respons.recordsTotal,
              data: []
            });
          });
      },
      columns: [
        { data: 'bookId', name: 'bookId' },
        { data: 'bname', name: 'bname' },
        { data: 'bdescription', name: 'bdescription' },
        { data: 'bauthorname', name: 'bauthorname' },
        { data: 'bpagenum', name: 'bpagenum' },
        { data: 'bcategory', name: 'bcategory' },
        { data: 'bprice', name: 'bprice' },
        { data: 'breleasyear', name: 'breleasyear' },
        { data: 'bLanguage', name: 'bLanguage' }
      ]
    };
  }

  clearField() {
    this.book.bname = '';
    this.book.bdescription = '';
    this.book.bpagenum = '';
    this.book.bauthorname = '';
    this.book.bcategory = '';
    this.book.bprice = '';
    this.book.breleasyear = '';
  }

  addBook(book) {
    this.bookService.addBook(book).subscribe();
    this.clearField();
    this.rerender();
  }

  // Show Books
  show() {
    
    this.rerender();
  }

  // Show Book by Id
  showbyid(bookid) {
    this.bookService.getBookById(bookid).subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book by Name
  showbybookName(bookname) {
    this.bookService.getBookByName(bookname).subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book by more than 100 page
  showbymorethan100(bpageno) {
    this.bookService.getBookByPage(bpageno).subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book by more than 25 and less than 90 page
  showbypagefilter(gpage, lpage, notequal) {
    this.bookService.getBookByPagefilter(gpage, lpage, notequal).subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book by 0 page
  showbyzeropg() {
    this.bookService.getBookByzeroPage(0).subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book by release year 2015
  showby2015(year) {
    this.bookService.getBookByYear(year).subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book by release year 2001 and 2015
  showbyyear(year1, year15) {
    this.bookService.getBookByYearfilter(year1, year15).subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book by highest price
  showhighestPrice() {
    this.bookService.getBookbyhighPrice().subscribe(response => {
      this.books = response.data;
    });
  }

  // Show Book have language
  showbooklang() {
    this.bookService.showbooklang().subscribe(response => {
      this.books = response.data;
    });
  }

  // Show by highest price & lowest pages
  highPriLowPgs() {
    this.bookService.getByFilter().subscribe(response => {
      this.books = response;
    });
  }

  // Delete Book by Id
  deletebyid(bookid) {
    this.bookService.deleteBookbyid(bookid).subscribe((data) => {});
  }

  // Delete Book by Name
  deletebyname(bookname) {
    this.bookService.deleteBookbyName(bookname).subscribe((data) => {
      this.rerender();
    });
  }

  // Delete Book by Author
  deletebyauthor(bookauthor) {
    this.bookService.deleteBookbyAuthor(bookauthor).subscribe();
  }

  // Delete Book by Author
  deletebyauthDesc(auth, desc) {
    this.bookService.deleteBookbyAuthDesc(auth, desc).subscribe();
  }

  // Delete Book by Name and Category
  deleteBookbyNameCate(name, cate) {
    this.bookService.deleteBookbyNameCate(name, cate).subscribe();
  }

  // Update Book by Id
  updatebyid(bookdetails) {
    this.bookService.updateBookbyid(bookdetails).subscribe();
  }

  // Update Book by Name
  updatebyBookname(bookdetails) {
    this.bookService.updateBookbyname(bookdetails).subscribe();
  }

  // Update Book by Author and name
  updatebyBookNameAuth(bookdetails) {
    this.bookService.updateBookbyNameAuthor(bookdetails).subscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
