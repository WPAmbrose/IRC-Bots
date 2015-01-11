//test wordnik

var request = require('request');
var _= require('lodash-node');
var async = require('async');
var wordUrl = 'http://api.wordnik.com:80/v4/word.json/<word>/';
var exampleUrl = 'examples?includeDuplicates=false&useCanonical=false&skip=0&limit=100';
var searchUrl = 'http://api.wordnik.com:80/v4/words.json/search/<search>*?caseSensitive=false&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&skip=0&limit=1000';
var defineUrl = 'definitions?limit=100&includeRelated=true&useCanonical=true&includeTags=false';
var rhymeUrl = 'relatedWords?useCanonical=false&relationshipTypes=rhyme&limitPerRelationshipType=100';
var pronUrl = 'pronunciations?useCanonical=false&limit=50';
var audioUrl = 'audio?useCanonical=false&limit=50';
var apiUrl = '&api_key=<api>';
var api = 'd2995fee04930f335d81803552c000b9aab0e63a3813e0326';
var word = 'read';


function getRandomInt(min,max){
	var rando = Math.floor(Math.random() * (max - min +1)) + min;
	return rando;
}


var urlRhymeBuild = wordUrl+rhymeUrl+apiUrl;
var urlRhymeBuild = urlRhymeBuild.replace(/<word>/gi, word).replace(/<api>/gi, api);

request(urlRhymeBuild, function (error, response, body) {
	if (error || response.statusCode !== 200 || body.length <= 2){
		//console.log('Try another word, I got no rhymes for you.');
	}else{
		var rhymeData = JSON.parse(body);
		//var rhymeCount = rhymeData[0].words.length-1;
		//console.log(rhymeData[0].words);
	}
});

var urlDefineBuild = wordUrl+defineUrl+apiUrl;
var urlDefineBuild = urlDefineBuild.replace(/<word>/gi, word).replace(/<api>/gi, api);

request(urlDefineBuild, function (error, response, body) {
	if (error || response.statusCode !== 200 || body.length <= 2){
		console.log('Try another word, I got no definitions for you.');
	}else{
		var defineData = JSON.parse(body);
		//console.log(defineData[0].word+" ["+defineData[0].partOfSpeech+"] : "+defineData[0].text);
		//console.log(defineData);
	}
});


var urlExampleBuild = wordUrl+exampleUrl+apiUrl;
var urlExampleBuild = urlExampleBuild.replace(/<word>/gi, word).replace(/<api>/gi, api);
request(urlExampleBuild, function (error, response, body) {
	if (error || response.statusCode !== 200 || body.length <= 2){
		console.log('Try another word, I got no examples for you, jack.');
	}else{
		var exampleData = JSON.parse(body);
		//console.log(exampleData.examples[0].text);
	}
});

var urlForecast ="https://api.forecast.io/forecast/a0826bcd5ec330beb7cc075b10f2e9c7/48.890123,-121.945702,2015-01-15T12:00:00";
request(urlForecast, function (error,response, body){
	if (error || response.statusCode !== 200 || body.length <= 2){
		console.log('Error, bro :'+ error);
	}else{
		var forecastData = JSON.parse(body);
		var forecastHBOMB = forecastData.hourly.data[11];
		var date = new Date(forecastHBOMB.time*1000);
		var time = date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear();
		//console.log("HBOMB Forecast: "+forecastHBOMB.summary+" - "+forecastHBOMB.temperature+" - Humidity : "+forecastHBOMB.humidity*100+"% - Precipitation : "+forecastHBOMB.precipType+" | "+time);
	}
});

var urlPronBuild = wordUrl+pronUrl+apiUrl;
var urlPronBuild = urlPronBuild.replace(/<word>/gi, word).replace(/<api>/gi, api);
request(urlPronBuild, function (error, response, body) {
	if (error || response.statusCode !== 200 || body.length <= 2){
		console.log('Try another word, I got no pronunciations for you, jack.');
	}else{
		var pronData = JSON.parse(body);
		console.log(pronData[0].raw);
	}
});


var urlAudioBuild = wordUrl+audioUrl+apiUrl;
var urlAudioBuild = urlAudioBuild.replace(/<word>/gi, word).replace(/<api>/gi, api);
request(urlAudioBuild, function (error, response, body) {
	if (error || response.statusCode !== 200 || body.length <= 2){
		console.log('Try another word, I got nothign to say to you.');
	}else{
		var audioData = JSON.parse(body);
		console.log(audioData[0].fileUrl);
	}
});

/*
var urlInitBuild = searchUrl+apiUrl;
var acArray = [];
var acObj = {};
var acLetter = word.split("");
var letterPattern = new RegExp('[a-zA-Z]');
var requests = 0;



var loopAcro = function(c, n, callback) {
	var urlAcBuild = urlInitBuild.replace(/<search>/gi, c).replace(/<api>/gi, api);
	console.log(c);
	if(letterPattern.test(c)){
	request(urlAcBuild, function (error, response, body) {
		if (error || response.statusCode !== 200 || body.length <= 2){
			//acObj[acLetter.indexOf(currLetter)] = "?";
			acObj[acLetter.indexOf(c)] = c;
		}else{
			var acData = JSON.parse(body);
			acObj[n] = acData.searchResults[0].word;
			//acArray.push(acData.searchResults[0].word);
			//console.log(acObj);
			callback();
		}

	});
	}else{
		acObj[n] = c;
		callback();
	}
};



function acronymTime(acObj){
	console.log(acObj);
	
}

async.each(acLetter, function(n, callback) {
	requests++;
	loopAcro(n,requests,callback);
}, function(err) {
	var acString = _.map(acObj, function(num) { return num; }).join(" ");
	console.log(acString.toUpperCase());
});*/