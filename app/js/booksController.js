'use strict';

/* Controllers */

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
		if(test) url = 'jsonExamples/book-list.json';
		else{
			if(newest) url = 'https://www.googleapis.com/books/v1/volumes?q=a&orderBy=newest&maxResults=4&key='+APIKey;
			else url = 'https://www.googleapis.com/books/v1/volumes?q=subject:'+category+'&orderBy=newest&maxResults=4&key='+APIKey;
		}
		$http.get(url).success(function(data){
				angular.forEach(data.items , function(rawBook){
					books.push(getBook(rawBook));
				});
			});
		return books;
	};

	$scope.likeBook = function (bookId){
        if (document.getElementById(bookId).className == 'fa fa-heart-o'){
        	document.getElementById(bookId).className = "fa fa-heart";
        }
        else{
        	document.getElementById(bookId).className = "fa fa-heart-o";
        }
	}
}]);

bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {  
	var url;
	if(test) url = 'jsonExamples/book.json';
	else url = 'https://www.googleapis.com/books/v1/volumes/'+$routeParams.bookId;
	$http.get(url).
		success(function(data){
			$scope.book = getBook(data);
			document.getElementById("bookDescription").innerHTML = $scope.book.description;
		});
}]);

bookusControllers.controller('BookSearchCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {  
	$scope.search = function(book){
		var url;
		if(test) url = 'jsonExamples/book-list.json';
		else url = 'https://www.googleapis.com/books/v1/volumes?q=' + book + '&orderBy=relevance&maxResults=4&key='+APIKey;
		$scope.books = [];
		$http.get(url).
		  success(function(data){
			angular.forEach(data.items , function(rawBook){
					$scope.books.push(getBook(rawBook));
				});
			$location.path( '/books/'+$scope.books[0].id ); //TODO
		  });
	};
}]);
