'use strict';

/* App Module */

var bookusApp = angular.module('bookusApp', [
  'ngRoute',
  'bookusControllers',
  'angulike'
]).run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '[180915725635406]'; //Facebook page
      }
  ]);



bookusApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/books', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListCtrl'
      }).
      when('/books/:bookId', {
        templateUrl: 'partials/book-detail.html',
        controller: 'BookDetailCtrl'
      }).      
      when('/user', {
        templateUrl: 'partials/user-search.html',
        controller: 'UserSearchCtrl'
      }).
	  when('/user/:userId', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserCtrl'
      }).
      when('/category/:categoryId', {
        templateUrl: 'partials/category.html',
        controller: 'CategoryCtrl'
      }).
	  when('/news', {
        templateUrl: 'partials/news.html',
        controller: 'NewsCtrl'
      }).
      otherwise({
        redirectTo: '/books'
      });
  }]);