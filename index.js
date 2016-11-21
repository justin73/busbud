// var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


app.get('/', require('./routes').index);

// app.get('/', function(request, response) {
//   response.render('pages/index')
// });

// app.get('/search',function(request,response){
// 	var request = require('request');
// 	var str2json = require('string-to-json');
// 	request({
// 	    headers: {
// 				    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
// 				    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
// 				},
// 	    uri: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-03?adult=1&child=0&senior=0&lang=en&currency=CAD',
// 	    method: 'GET'
// 	  }, function (err, res, body) {
// 	    response.render('partials/result', {
// 		    result: body
// 		});
//   	});

// })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

