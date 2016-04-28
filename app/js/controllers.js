'use strict';

/* Controllers */

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

bookusControllers.controller('BookListCtrl', ['$scope', '$firebaseArray',
  function($scope, $firebaseArray) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	
	$scope.books = $firebaseArray(ref.child('books'));
	
	$scope.orderProp = 'author';
}]);
  
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


bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$firebaseObject',
  function($scope, $routeParams, $firebaseObject) {
	var ref = new Firebase("https://bookus.firebaseio.com/books/"+$routeParams.bookId);
	$scope.book = $firebaseObject(ref);
}]);

bookusControllers.controller('UserCtrl', ['$scope', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $routeParams, $firebaseObject, $firebaseArray) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	$scope.user = $firebaseObject(ref.child("users").child($routeParams.userId));
	/*TODO -- Get array of books form array of ids of books --
	
	var idBooksRead = $firebaseArray(ref.child("users").child($routeParams.userId).child("read"));
	$scope.booksRead = [];
	for(var id in idBooksRead){
		$scope.booksRead.push(ref.child("books").child(id));
	}
	var idBooksWanted = $firebaseArray(ref.child("users").child($routeParams.userId).child("want"));
	$scope.booksWanted = [];
	for(var id in idBooksWanted){
		$scope.booksWanted.push(ref.child("books").child(id));
	}*/
}]);
