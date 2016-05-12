'use strict';

/* Authentication Controller */

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
			$scope.booksReadRef = ref.child(authData.uid).child("read");
			$scope.booksWantedRef = ref.child(authData.uid).child("want");
			$scope.booksLikedRef = ref.child(authData.uid).child("liked");
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
		location.reload();
	};
	
	$scope.addBookRead = function(idBook){
		if (document.getElementById(idBook + 'R').innerHTML == 'Read'){
        	document.getElementById(idBook + 'R').innerHTML = "Unread";
        	document.getElementById(idBook + 'R').className = "btn btn-danger";
        	document.getElementById(idBook + 'W').className = "btn btn-info disabled";
        	$scope.booksReadRef.child(idBook).set({
				id: idBook
			});
			if (document.getElementById(idBook + 'W').innerHTML == 'Unwanted'){
				$scope.booksWantedRef.child(idBook).remove();
				document.getElementById(idBook + 'W').className = "btn btn-info disabled";
				document.getElementById(idBook + 'W').innerHTML = "Want";
			}
        }
        else{
        	document.getElementById(idBook + 'R').innerHTML = "Read";
        	document.getElementById(idBook + 'R').className = "btn btn-info";
        	document.getElementById(idBook + 'W').className = "btn btn-info";
        	$scope.booksReadRef.child(idBook).remove();
        }
	};
	
	$scope.addBookWant = function(idBook){
		if (document.getElementById(idBook + 'W').className == 'btn btn-info'){
        	document.getElementById(idBook + 'W').className = "btn btn-danger";
        	document.getElementById(idBook + 'W').innerHTML = "Unwanted";
        	$scope.booksWantedRef.child(idBook).set({
				id: idBook
			});
			if (document.getElementById(idBook + 'R').className == 'Read'){
				
			}
        }
        else{
        	document.getElementById(idBook + 'W').className = "btn btn-info";
			document.getElementById(idBook + 'W').innerHTML = "Want";
			$scope.booksWantedRef.child(idBook).remove();
        }
	};

	$scope.addBookLiked = function(idBook){
		if (document.getElementById(idBook).className == 'fa fa-heart-o'){
        	document.getElementById(idBook).className = "fa fa-heart";
        	$scope.booksLikedRef.child(idBook).set({
				id: idBook
			});
        }
        else{
        	document.getElementById(idBook).className = "fa fa-heart-o";
        	$scope.booksLikedRef.child(idBook).remove();
        }
	};

}]);