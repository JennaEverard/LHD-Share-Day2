const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const prompt = require('prompt');

const {apiKey} = require('./secret.js');

prompt.start();

prompt.get(['city'], function(err, result) {
	if (err) { return onErr(err); }
	console.log('You Entered the City of ' + result.city);
	
	const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + result.city + '&appid=' + apiKey + '&units=imperial';

	axios.get(url).then(response => {
		console.log("The Temperature is: " + response.data.main.temp + " degrees F");
		console.log("The weather is: " + response.data.weather[0]['description']);
		if (response.data.main.temp < 60)
		{
			console.log('\n\nWow It is cold! Better layer up! \n\n');
			fs.readFile('./cold.txt', 'utf8', (err, data) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(data);
			});
		}
		if
(response.data.weather[0]['description'].includes('clear')) {
			console.log('\n\nLooks like it is clear skies - time to get out those sunglasses!\n\n');
			fs.readFile('./sunglasses.txt', 'utf8', (err,
data) => {
			console.log(data);
		});
		}
		if
(response.data.weather[0]['description'].includes('rain')) {
			console.log('\n\nLooks rather rainy, might need an umbrella!');
			fs.readFile('./umbrella.txt', 'utf8', (err,
data) => {
			console.log(data);
		});
		}
	});
});
