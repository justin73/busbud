exports.index = function(req, res){
	response = res
	var request = require('request');
	var str2json = require('string-to-json');
	request({
	    headers: {
				    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
				    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
				},
	    uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-03?adult=1&child=0&senior=0&lang=en&currency=CAD',
	    method: 'GET'
	  }, function (err, res, body) {
	  	console.log(typeof body)
	  	console.log(JSON.parse(body))
	    response.render('index');
  	});
};