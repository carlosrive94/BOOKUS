import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Book } from './book';
import { BookDetailComponent } from './book-detail.component';
import { BookService } from './book.service';

@Component({
  selector: 'my-books',
  templateUrl: 'app/books.component.html',
  styleUrls:  ['app/books.component.css'],
  directives: [BookDetailComponent]
})
export class BooksComponent implements OnInit {
  books: Book[];
  selectedBook: Book;

  constructor(
    private _router: Router,
    private _bookService: BookService) { }

  getBooks() {
    this._bookService.getBooks().then(books => this.books = books);
  }

  ngOnInit() {
    this.getBooks();
  }

  onSelect(book: Book) { this.selectedBook = book; }

  gotoDetail() {
    this._router.navigate(['BookDetail', { id: this.selectedBook.id }]);
  }
}