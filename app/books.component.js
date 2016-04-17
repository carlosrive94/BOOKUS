System.register(['angular2/core', 'angular2/router', './book-detail.component', './book.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, book_detail_component_1, book_service_1;
    var BooksComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (book_detail_component_1_1) {
                book_detail_component_1 = book_detail_component_1_1;
            },
            function (book_service_1_1) {
                book_service_1 = book_service_1_1;
            }],
        execute: function() {
            BooksComponent = (function () {
                function BooksComponent(_router, _bookService) {
                    this._router = _router;
                    this._bookService = _bookService;
                }
                BooksComponent.prototype.getBooks = function () {
                    var _this = this;
                    this._bookService.getBooks().then(function (books) { return _this.books = books; });
                };
                BooksComponent.prototype.ngOnInit = function () {
                    this.getBooks();
                };
                BooksComponent.prototype.onSelect = function (book) { this.selectedBook = book; };
                BooksComponent.prototype.gotoDetail = function () {
                    this._router.navigate(['BookDetail', { id: this.selectedBook.id }]);
                };
                BooksComponent = __decorate([
                    core_1.Component({
                        selector: 'my-books',
                        templateUrl: 'app/books.component.html',
                        styleUrls: ['app/books.component.css'],
                        directives: [book_detail_component_1.BookDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, book_service_1.BookService])
                ], BooksComponent);
                return BooksComponent;
            }());
            exports_1("BooksComponent", BooksComponent);
        }
    }
});
//# sourceMappingURL=books.component.js.map