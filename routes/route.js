//Controllers Definitions
var admin = require('../controllers/admin');
var users = require('../controllers/users');
var login = require('../controllers/login');
var globalfunctions = require('../controllers/global');

module.exports = function () {
	//Login Pages
	app.get('/', login.index);
	app.post('/', login.loginverify);

	//User Pages
	app.get('/users/', globalfunctions.checkUserAuth, users.index);
	app.get('/users/newrfq', globalfunctions.checkUserAuth, users.newrfq);
	app.post('/users/newrfq', globalfunctions.checkUserAuth, users.save_rfq_general_data);
	app.get('/users/fetch_sales_persons/:id', globalfunctions.checkUserAuth, users.fetch_sales_persons);
	app.get('/users/fetch_sales_agents/:id', globalfunctions.checkUserAuth, users.fetch_sales_agents);
};
