'use strict';

/* Globals */

var test = true; 

var APIKey = 'AIzaSyCtNBUQRvEOR-jmYBzg2oZ-H8IuI_pIc4Y';

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

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

/* Search with intro */
$("#textSearch").keyup(function(event){
    if(event.keyCode == 13){
        $("#buttonSearch").click();
    }
});
