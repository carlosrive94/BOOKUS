'use strict';

/* Controllers */

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

bookusControllers.controller('BookListCtrl', ['$scope', '$http',
  function($scope, $http) {  
	$http.get('https://www.googleapis.com/books/v1/volumes?q=comedy&maxResults=5'). //TODO
		success(function(data){
			$scope.books = [];
			angular.forEach(data.items , function(rawBook){
				$scope.books.push(getBook(rawBook));
			});
		});
}]);

function getBook(rawBook){
	return {
		id: rawBook.id,
		title: rawBook.volumeInfo.title,
		author: rawBook.volumeInfo.authors[0], //TODO
		image: rawBook.volumeInfo.imageLinks.thumbnail
	}
}
  
bookusControllers.controller('AuthCtrl', ['$scope', '$firebaseAuth' , '$firebaseObject' , '$firebaseArray',
  function($scope, $firebaseAuth, $firebaseObject, $firebaseArray) {
	var ref = new Firebase("https://bookus.firebaseio.com/users");
	var auth = $firebaseAuth(ref);
	
	ref.onAuth(function(authData) {
		if (authData){
			ref.child(authData.uid).once('value', function(snapshot){
				if (!snapshot.exists()) {
					ref.child(authData.uid).set({
						provider: authData.provider,
						uid: authData.uid,
						name: getName(authData),
						photo: getPhoto(authData)
					});
				}
			});
			$scope.currentUser = $firebaseObject(ref.child(authData.uid));
			$scope.booksRead = $firebaseArray(ref.child(authData.uid).child("read"));
			$scope.booksWanted = $firebaseArray(ref.child(authData.uid).child("want"));
		}
	});
	
	function getName(authData) {
		switch(authData.provider) {
			case 'password':
				return authData.password.email.replace(/@.*/, '');
			case 'twitter':
				return authData.twitter.displayName;
			case 'facebook':
				return authData.facebook.displayName;
			case 'google':
				return authData.google.displayName;
		}
	};

	function getPhoto(authData) {
		switch(authData.provider) {
			case 'facebook':
				return authData.facebook.profileImageURL;
			case 'twitter':
				return authData.twitter.profileImageURL;
			case 'google':
				return authData.google.profileImageURL;
		}
	};
	
	$scope.login = function(provider){
		console.log("Login with " + provider);
		ref.authWithOAuthPopup(provider, function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
			}
		});
	}
	
	$scope.logout = function(){
		ref.unauth();
	};
	
	$scope.addBookRead = function(idBook){
		$scope.booksRead.$add({
			id: idBook
		});
	};
	
	$scope.addBookWant = function(idBook){
		$scope.booksWanted.$add({
			id: idBook
		});
	};
}]);


bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
	$http.get('https://www.googleapis.com/books/v1/volumes?q='+$routeParams.bookId).
		success(function(data){
			$scope.book = getBook(data.items[0]); //There will be always just one object
		});
}]);

bookusControllers.controller('UserCtrl', ['$scope', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $routeParams, $firebaseObject, $firebaseArray) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	$scope.user = $firebaseObject(ref.child("users").child($routeParams.userId));
	
	var idBooksRead = $firebaseArray(ref.child("users").child($routeParams.userId).child("read"));
	idBooksRead.$loaded()
		.then(function(){
			$scope.booksRead = [];
			angular.forEach(idBooksRead, function(obj){
				var book = $firebaseObject(ref.child("books").child(obj.id));
				$scope.booksRead.push(book);
			})
		});
	
	var idBooksWanted = $firebaseArray(ref.child("users").child($routeParams.userId).child("want"));
	idBooksWanted.$loaded()
		.then(function(){
			$scope.booksWanted = [];
			angular.forEach(idBooksWanted, function(obj){
				var book = $firebaseObject(ref.child("books").child(obj.id));
				$scope.booksWanted.push(book);
			})
		});
}]);
