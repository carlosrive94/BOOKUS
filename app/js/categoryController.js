'use strict';

/* Category Controller */

bookusControllers.controller('CategoryCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
  	$scope.category = $routeParams.categoryId;
  	$scope.books = [];
  	var url;
  	if ($routeParams.categoryId == "newest") url = 'https://www.googleapis.com/books/v1/volumes?q=orderBy=newest&key='+APIKey;
  	else url = 'https://www.googleapis.com/books/v1/volumes?q=subject:'+$routeParams.categoryId+'&key='+APIKey; 
	$http.get(url).success(function(data){
			angular.forEach(data.items , function(rawBook){
				$scope.books.push(getBook(rawBook));
			});
		});
}]);
