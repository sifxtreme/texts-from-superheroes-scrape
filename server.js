var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var comicImages = [];
var limiter = 50;

var output = function(res){
	outputString = "";
	for(var i=0; i<comicImages.length; i++){
		outputString += "<div>"+comicImages[i]+"</div>";
	}
	res.send(outputString);
};

app.get('/scrape', function(req, res){
	
	url = 'http://www.imdb.com/title/tt1229340/';
	url = 'http://textsfromsuperheroes.com/page/';
	var counter = 1;

	var getResult = function(url){
		request(url + counter, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);

				var title, release, rating;
				var json = { title : "", release : "", rating : ""};

				$('.post img').each(function(){
		      var data = $(this);
		      comicImages.push(String(data));
				});

				counter++;
				if(counter < limiter){
					getResult(url);
				}
				else{
					output(res);
				}
		    
			}
		})
	}

	getResult(url);


})

app.listen('5000')
console.log('Magic happens on port 5000');
exports = module.exports = app;