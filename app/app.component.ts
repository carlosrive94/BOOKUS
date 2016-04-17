import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { BookService } from './book.service';
import { DashboardComponent } from './dashboard.component';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Books']">Books</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    BookService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'BookDetail',
    component: BookDetailComponent
  },
  {
    path: '/books',
    name: 'Books',
    component: BooksComponent
  }
])
export class AppComponent {
  title = 'Tour of Books';
}