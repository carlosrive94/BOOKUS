'use strict';

/* News Controller */

bookusControllers.controller('NewsCtrl', ['$scope',
  function($scope) {
   changeNav("navNews");

	var feedcontainer=document.getElementById("feeddiv");
	var feedurl="https://www.bookbrowse.com/rss/book_news.rss";
	var feedlimit=8;
	var rssoutput="<b>Latest News:</b><br /><ul>";

	function rssfeedsetup(){
		var feedpointer=new google.feeds.Feed(feedurl); //Google Feed API method
		feedpointer.setNumEntries(feedlimit); //Google Feed API method
		feedpointer.load(displayfeed); //Google Feed API method
	}

	function displayfeed(result){
		if (!result.error){
			var thefeeds=result.feed.entries;
			for (var i=0; i<thefeeds.length; i++){
				rssoutput+="<li><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></li>";
				rssoutput+="<p>" + thefeeds[i].content + "</p>";
				rssoutput+="</ul>";
				feedcontainer.innerHTML=rssoutput;
			}
		}
		else{
			alert("Error fetching feeds!");
		}
	}

	window.onload=function(){
		rssfeedsetup();
	}
}]);