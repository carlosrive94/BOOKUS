'use strict';

/* Globals */

var test = true; //To access or not to access to Google Books API

var APIKey = 'AIzaSyCtNBUQRvEOR-jmYBzg2oZ-H8IuI_pIc4Y';

var bookusControllers = angular.module('bookusControllers', ["firebase"]);

var reload = false; //Reload the page to show the buttons (should be another way to do it)

function changeNav(currentNav){
	var title = "Bookus"
	switch(currentNav){
		case 'navCategories':
			title += " - Categories";
			break;
		case 'navUsers':
			title += " - Users";
			break;
		case 'navNews':
			title += " - News";
			break;
	}
	document.title = title;
	
	document.getElementById("navHome").className = "";
	document.getElementById("navMyBooks").className = "";
	document.getElementById("navCategories").className = "";
	document.getElementById("navUsers").className = "";
	document.getElementById("navNews").className = "";
	document.getElementById(currentNav).className = "active";
	
	//Reload the page to show the buttons (should be another way to do it)
	if(currentNav == "navHome" || currentNav == "navCategories"){
		if(reload){
			location.reload();
			reload = false;
		}
		else reload = true;
	}
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
