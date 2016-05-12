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
		if(newest) url = 'https://www.googleapis.com/books/v1/volumes?q=a&orderBy=newest&maxResults=4&key='+APIKey;
		else url = 'https://www.googleapis.com/books/v1/volumes?q=subject:'+category+'&orderBy=newest&maxResults=4&key='+APIKey;
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

function changeNav(currentNav){
	document.getElementById("navHome").className = "";
	document.getElementById("navMyBooks").className = "";
	document.getElementById("navCategories").className = "";
	document.getElementById("navUsers").className = "";
	document.getElementById("navNews").className = "";
	document.getElementById(currentNav).className = "active";
}

function getBook(rawBook){
	var authors = "";
	for (var i=0; i < rawBook.volumeInfo.authors.length; ++i){
		authors += rawBook.volumeInfo.authors[i];
		if(i != rawBook.volumeInfo.authors.length-1) authors += ", ";
	};
	return {
		id: rawBook.id,
		title: rawBook.volumeInfo.title,
		authors: authors,
		image: rawBook.volumeInfo.imageLinks.thumbnail,
		publishedDate: rawBook.volumeInfo.publishedDate,
		description: rawBook.volumeInfo.description,
		averageRating: rawBook.volumeInfo.averageRating,
		ratingsCount: rawBook.volumeInfo.ratingsCount,
		pageCount: rawBook.volumeInfo.pageCount
	}
}

bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {  
	$http.get('https://www.googleapis.com/books/v1/volumes/'+$routeParams.bookId).
		success(function(data){
			$scope.book = getBook(data);
			document.getElementById("bookDescription").innerHTML = $scope.book.description;
		});
}]);
