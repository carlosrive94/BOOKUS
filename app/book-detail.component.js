System.register(['angular2/core', 'angular2/router', './book', './book.service'], function(exports_1, context_1) {
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
    var core_1, router_1, book_1, book_service_1;
    var BookDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (book_1_1) {
                book_1 = book_1_1;
            },
            function (book_service_1_1) {
                book_service_1 = book_service_1_1;
            }],
        execute: function() {
            BookDetailComponent = (function () {
                function BookDetailComponent(_bookService, _routeParams) {
                    this._bookService = _bookService;
                    this._routeParams = _routeParams;
                }
                BookDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this._bookService.getBook(id)
                        .then(function (book) { return _this.book = book; });
                };
                BookDetailComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', book_1.Book)
                ], BookDetailComponent.prototype, "book", void 0);
                BookDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-book-detail',
                        templateUrl: 'app/book-detail.component.html',
                        styleUrls: ['app/book-detail.component.css']
                    }), 
                    __metadata('design:paramtypes', [book_service_1.BookService, router_1.RouteParams])
                ], BookDetailComponent);
                return BookDetailComponent;
            }());
            exports_1("BookDetailComponent", BookDetailComponent);
        }
    }
});
//# sourceMappingURL=book-detail.component.js.map