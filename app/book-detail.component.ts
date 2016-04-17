import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'my-book-detail',
  templateUrl: 'app/book-detail.component.html',
  styleUrls: ['app/book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private _bookService: BookService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._bookService.getBook(id)
      .then(book => this.book = book);
  }

  goBack() {
    window.history.back();
  }
}
