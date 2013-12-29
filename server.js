var express = require('express'), 
	app     = express(), 
	http    = require('http'), 
	server  = http.createServer(app);

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname +  '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
