'use strict';

/* Controllers */
var APIKey = 'AIzaSyCtNBUQRvEOR-jmYBzg2oZ-H8IuI_pIc4Y';

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

bookusControllers.controller('BookListCtrl', ['$scope', '$http',
  function($scope, $http) {  
	changeNav("navHome");
	
	$scope.newBooks = getBooks(null,true);
	$scope.comedyBooks = getBooks("Comedy",false);
	$scope.dramaBooks = getBooks("Drama",false);
	$scope.fictionBooks = getBooks("Fiction",false)
	
	function getBooks(category,newest){
		var books = [];
		var url;
		if(newest) url = 'https://www.googleapis.com/books/v1/volumes?q=orderBy=newest&maxResults=4&key='+APIKey;
		else url = 'https://www.googleapis.com/books/v1/volumes?q=subject:'+category+'&orderBy=relevance&maxResults=4&key='+APIKey;
		$http.get(url).success(function(data){
				angular.forEach(data.items , function(rawBook){
					books.push(getBook(rawBook));
				});
			});
		return books;
	};
}]);

function changeNav(currentNav){
	document.getElementById("navHome").className = "";
	document.getElementById("navMyBooks").className = "";
	document.getElementById("navCategories").className = "";
	document.getElementById("navNews").className = "";
	document.getElementById(currentNav).className = "active";
}

function getBook(rawBook){
	return {
		id: rawBook.id,
		title: rawBook.volumeInfo.title,
		author: rawBook.volumeInfo.authors[0], //TODO
		image: rawBook.volumeInfo.imageLinks.thumbnail
	}
}

bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {  
	$http.get('https://www.googleapis.com/books/v1/volumes/'+$routeParams.bookId).
		success(function(data){
			$scope.book = getBook(data);
		});
}]);
