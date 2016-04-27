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
						name: getName(authData)
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
	
	$scope.loginGoogle = function() {
		console.log("Login with Google");
		ref.authWithOAuthPopup("google", function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
			}
		});
	};
	
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
    $http.get('books/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.book = data;
    });
  }]);
