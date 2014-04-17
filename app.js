module.exports = function () {
	var express = require('express');
	

	var path = require('path');

	app = express();
	
	//Load the iniparser module
	var iniparser = require('iniparser');
	config = iniparser.parseSync('./config/config.ini');

	moment = require('moment');
	crypto = require('crypto');

	// all environments
	app.set('port', process.env.PORT || config.port_app);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.json());
	app.use(express.cookieParser('S3CR3T'));
	app.use(express.bodyParser());
	app.use(express.urlencoded());
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	querystring = require('querystring');
	//including routing file
	var routes = require('./routes/route')();
	return app;
};
