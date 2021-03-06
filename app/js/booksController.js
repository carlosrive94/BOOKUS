'use strict';

/* Books Controllers */

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
			document.title += " - " + $scope.book.title;
			
			//Share configuration
			$scope.myModel = {
			  Url: "https://bookus.herokuapp.com/#/books/" + $scope.book.id,
			  Name: "You should totally check " + $scope.book.title + " on BOOKUS!",
			  ImageUrl: $scope.book.ImageUrl
			};
		});
	
}]);

bookusControllers.controller('BookSearchCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {  
	$scope.search = function(book){ 
		var url;
		if(test) url = 'jsonExamples/book-list.json';
		else url = 'https://www.googleapis.com/books/v1/volumes?q=' + book + '&orderBy=relevance&maxResults=4&key='+APIKey;
		$scope.books = [];
		$http.get(url).success(function(data){
			angular.forEach(data.items , function(rawBook){
					$scope.books.push(getBook(rawBook));
				});
			if($scope.books.length != 0) $location.path( '/books/'+$scope.books[0].id ); //TODO
			else alert("Any Books found");
		});
	};
}]);