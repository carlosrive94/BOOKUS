'use strict';

/* Controllers */

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

bookusControllers.controller('BookListCtrl', ['$scope', '$firebaseArray',
  function($scope, $firebaseArray) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	
	$scope.books = $firebaseArray(ref);
	
	$scope.orderProp = 'author';
	

  }]);
  
bookusControllers.controller('AuthCtrl', ['$scope', '$firebaseAuth' ,
  function($scope, $firebaseAuth) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	var auth = $firebaseAuth(ref);
	
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
}]);

bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('books/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.book = data;
    });
  }]);
