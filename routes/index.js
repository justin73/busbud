
exports.index = function(req, res){
	response = res
	var request = require('request');
	request({
	    headers: {
				    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
				    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
				},
	    uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-03?adult=1&child=0&senior=0&lang=en&currency=CAD',
	    method: 'GET'
	  }, function (err, res, body) {
	    response.render('index');
  	});
};

exports.initial_search = function(req, res){
	response = res
	var request = require('request');
	query_string = "?adult="+req.query.adult+"&senior="+req.query.senior+"&child="+req.query.child+"&lang=en"+"&currency="+req.query.currency
	request({
	    headers: {
				    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
				    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
				},
<<<<<<< HEAD
	    uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29'+query_string,
=======
	    uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-03'+query_string,
>>>>>>> 30d94a6d20946fb6135362dab48b165f729b7c68
	    method: 'GET'
	  }, function (err, response, body) {
	    res.json(body)
  	});
};
exports.search = function(req, res){
	response = res
	var request = require('request');
	query_string = "?adult="+req.query.adult+"&senior="+req.query.senior+"&child="+req.query.child+"&lang=en"+"&currency="+req.query.currency
	request({
	    headers: {
				    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
				    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
				},
<<<<<<< HEAD
	    uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29/poll'+query_string,
=======
	    uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-03/poll'+query_string,
>>>>>>> 30d94a6d20946fb6135362dab48b165f729b7c68
	    method: 'GET'
	  }, function (err, response, body) {
	    res.json(body)
  	});
};