'use strict';

/* User Controller */

bookusControllers.controller('UserCtrl', ['$scope', '$routeParams', '$firebaseObject', '$firebaseArray', '$http',
  function($scope, $routeParams, $firebaseObject, $firebaseArray, $http) {
	changeNav("navMyBooks");
	var ref = new Firebase("https://bookus.firebaseio.com/");
	$scope.user = $firebaseObject(ref.child("users").child($routeParams.userId));
	
	$scope.user.$loaded()
		.then(function(){
			document.title += " - " + $scope.user.name;
		});
	
	var idBooksRead = $firebaseArray(ref.child("users").child($routeParams.userId).child("read"));
	idBooksRead.$loaded()
		.then(function(){
			$scope.booksRead = [];
			angular.forEach(idBooksRead, function(obj){
				$http.get('https://www.googleapis.com/books/v1/volumes/'+obj.id).
				success(function(data){
					var book = getBook(data);
					$scope.booksRead.push(book);
				});
			})
		});
	
	var idBooksWanted = $firebaseArray(ref.child("users").child($routeParams.userId).child("want"));
	idBooksWanted.$loaded()
		.then(function(){
			$scope.booksWanted = [];
			angular.forEach(idBooksWanted, function(obj){
				$http.get('https://www.googleapis.com/books/v1/volumes/'+obj.id).
				success(function(data){
					var book = getBook(data);
					$scope.booksWanted.push(book);
				});
			})
		});
		
	var idBooksLiked = $firebaseArray(ref.child("users").child($routeParams.userId).child("liked"));
	idBooksWanted.$loaded()
		.then(function(){
			$scope.booksLiked = [];
			angular.forEach(idBooksLiked, function(obj){
				$http.get('https://www.googleapis.com/books/v1/volumes/'+obj.id).
				success(function(data){
					var book = getBook(data);
					$scope.booksLiked.push(book);
				});
			})
		});
}]);

bookusControllers.controller('UserSearchCtrl', ['$scope', '$firebaseObject', '$firebaseArray',
  function($scope, $firebaseObject, $firebaseArray){
	changeNav("navUsers");
	
	var ref = new Firebase("https://bookus.firebaseio.com/users");
	$scope.users = $firebaseArray(ref);
  }]);