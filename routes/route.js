//Controllers Definitions
var admin = require('../controllers/admin');
var users = require('../controllers/users');
var login = require('../controllers/login');
var tendering = require('../controllers/tendering');
var globalfunctions = require('../controllers/global');

module.exports = function () {
	//Login Pages
	app.get('/', login.index);
	app.get('/logout', login.logout);
	app.post('/', login.loginverify);


	//User Pages
	app.get('/users/', globalfunctions.checkUserAuth, users.index);
	app.get('/users/newrfq', globalfunctions.checkUserAuth, users.newrfq);

	app.get('/users/bids', globalfunctions.checkUserAuth, users.get_bids);
	app.get('/users/bid/:rfq_id', globalfunctions.checkUserAuth, users.get_rfq_bid);
	app.post('/users/save_questions/:rfq_id', globalfunctions.checkUserAuth, users.save_questions);
	app.post('/users/rfq_submit_bid/:rfq_id', globalfunctions.checkUserAuth, users.rfq_submit_bid);
	app.post('/users/rfq_submit_no_bid/:rfq_id', globalfunctions.checkUserAuth, users.rfq_submit_no_bid);

	app.get('/users/finalize', globalfunctions.checkUserAuth, users.finalize);
	app.get('/users/finalize/:rfq_id', globalfunctions.checkUserAuth, users.finalize_rfq);


	app.get('/users/rfq_general_data/:rfq_id', globalfunctions.checkUserAuth, users.rfq_general_data);

	app.post('/users/newrfq', globalfunctions.checkUserAuth, users.save_rfq_general_data);
	app.post('/users/update_rfq_general_data', globalfunctions.checkUserAuth, users.update_rfq_general_data);
	
	app.get('/users/rfq_product_data/:rfq_id',globalfunctions.checkUserAuth, users.rfq_product_data);
	app.post('/users/save_rfq_product_data/:rfq_id',globalfunctions.checkUserAuth, users.save_rfq_product_data);

	app.post('/users/save_line_item/:rfq_id',globalfunctions.checkUserAuth, users.save_line_item);
	app.post('/users/update_line_item/:line_item_id',globalfunctions.checkUserAuth, users.update_line_item);

	app.get('/users/rfq_line_items/:rfq_id',globalfunctions.checkUserAuth, users.rfq_line_items);

	app.get('/users/fetch_unit/:prop_id',globalfunctions.checkUserAuth, users.fetch_unit);

	app.post('/users/rfq_complete/:rfq_id',globalfunctions.checkUserAuth, users.rfq_complete);

	app.post('/users/delete_line_item',globalfunctions.checkUserAuth, users.delete_line_item);
	app.get('/users/fetch_rfq_line_items/:rfq_id/:line_item',globalfunctions.checkUserAuth, users.fetch_rfq_line_items);
	
	app.get('/users/fetch_sales_persons/:id', globalfunctions.checkUserAuth, users.fetch_sales_persons);
	app.get('/users/fetch_sales_agents/:id', globalfunctions.checkUserAuth, users.fetch_sales_agents);
	app.get('/users/fetch_tendering_teams/:product_line_id', globalfunctions.checkUserAuth, users.fetch_tendering_teams);
	app.get('/users/fetch_plants_properties/:product_line_id', globalfunctions.checkUserAuth, users.fetch_plants_properties);

	app.get('/users/bid_rfq/:rfq_id', globalfunctions.checkUserAuth, users.bid_rfq);
	app.get('/users/no_bid_rfq/:rfq_id', globalfunctions.checkUserAuth, users.no_bid_rfq);

	app.get('/users/fetch_tendering_teams_members/:tendering_teams_id', globalfunctions.checkUserAuth, users.fetch_tendering_teams_members);

	// Tendering Team
	app.get('/users/tendering_quote', globalfunctions.checkUserAuth, tendering.tendering_quote_init);
	app.get('/users/tendering_quote/:rfq_id', globalfunctions.checkUserAuth, tendering.tendering_rfq_quote);
	app.get('/users/product_designs/:rfq_id/:rfq_lines_id', globalfunctions.checkUserAuth, tendering.product_designs);

};
