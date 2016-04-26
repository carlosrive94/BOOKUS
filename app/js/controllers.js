'use strict';

/* Controllers */

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

bookusControllers.controller('BookListCtrl', ['$scope', '$firebaseArray',
  function($scope, $firebaseArray) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	
	$scope.books = $firebaseArray(ref);
	
	$scope.orderProp = 'author';
	

  }]);
  
bookusControllers.controller('AuthCtrl', ['$scope', '$firebaseAuth' , '$firebaseObject' ,
  function($scope, $firebaseAuth, $firebaseObject) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	var auth = $firebaseAuth(ref);
	
	ref.onAuth(function(authData) {
		if (authData){
			var isNewUser = ref.child('users/'+authData.uid) === null;
			if(isNewUser) {
				ref.child("users").child(authData.uid).set({
					provider: authData.provider,
					name: getName(authData)
				});
			}
			$scope.currentUser = $firebaseObject(ref.child('users/'+authData.uid));
			console.log($scope.currentUser);
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
	}
	
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
	}
}]);


bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('books/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.book = data;
    });
  }]);
