import {Injectable} from 'angular2/core';
import {Book} from './book';
import {BOOKS} from './mock-books';

@Injectable()
export class BookService {
	getBooks() {
		return Promise.resolve(BOOKS);
	}
	
	getBook(id: number) {
		return Promise.resolve(BOOKS).then(
			books => books.filter(book => book.id === id)[0]
		);
	}
}