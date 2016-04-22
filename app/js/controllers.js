'use strict';

/* Controllers */

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

bookusControllers.controller('BookListCtrl', ['$scope', '$firebaseArray',
  function($scope, $firebaseArray) {
	var ref = new Firebase("https://bookus.firebaseio.com/");
	// create a synchronized array
	$scope.books = $firebaseArray(ref);
	$scope.orderProp = 'author';
  }]);

bookusControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('books/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.book = data;
    });
  }]);
