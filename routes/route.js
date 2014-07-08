//Controllers Definitions
var admin = require('../controllers/admin');
var users = require('../controllers/users');
var login = require('../controllers/login');
var tendering = require('../controllers/tendering');
var quote_finalize = require('../controllers/quote_finalize');
var globalfunctions = require('../controllers/global');

module.exports = function () {
	//Login Pages
	app.get('/', login.index);
	app.get('/logout', login.logout);
	app.post('/', login.loginverify);

	app.get('/users/', globalfunctions.checkAllAuth, users.index);
	app.get('/users/profile', globalfunctions.checkAllAuth, users.profile);
	app.post('/users/change_password', globalfunctions.checkAllAuth, users.change_password);

	//Sales Team RFQ Creation and finalization
	
	app.get('/users/newrfq', globalfunctions.checkSalesAuth, users.newrfq);

	app.get('/users/finalize', globalfunctions.checkSalesAuth, users.finalize);
	app.get('/users/finalize/:rfq_id', globalfunctions.checkSalesAuth, users.finalize_rfq);

	app.get('/users/rfq_general_data/:rfq_id', globalfunctions.checkSalesAuth, users.rfq_general_data);

	app.post('/users/newrfq', globalfunctions.checkSalesAuth, users.save_rfq_general_data);
	app.post('/users/update_rfq_general_data', globalfunctions.checkSalesAuth, users.update_rfq_general_data);
	
	app.get('/users/rfq_product_data/:rfq_id',globalfunctions.checkSalesAuth, users.rfq_product_data);
	app.post('/users/save_rfq_product_data/:rfq_id',globalfunctions.checkSalesAuth, users.save_rfq_product_data);

	app.post('/users/save_line_item/:rfq_id',globalfunctions.checkSalesAuth, users.save_line_item);
	app.post('/users/update_line_item/:line_item_id',globalfunctions.checkSalesAuth, users.update_line_item);

	app.get('/users/rfq_line_items/:rfq_id',globalfunctions.checkSalesAuth, users.rfq_line_items);

	app.post('/users/rfq_complete/:rfq_id',globalfunctions.checkSalesAuth, users.rfq_complete);

	app.post('/users/delete_line_item',globalfunctions.checkSalesAuth, users.delete_line_item);
	app.get('/users/fetch_rfq_line_items/:rfq_id/:line_item',globalfunctions.checkSalesAuth, users.fetch_rfq_line_items);
	
	app.get('/users/fetch_sales_persons/:id', globalfunctions.checkSalesAuth, users.fetch_sales_persons);
	app.get('/users/fetch_sales_agents/:id', globalfunctions.checkSalesAuth, users.fetch_sales_agents);
	app.get('/users/fetch_tendering_teams/:product_line_id', globalfunctions.checkSalesAuth, users.fetch_tendering_teams);

	//Tendering Team Bid No-Bid
	app.get('/users/bid_rfq/:rfq_id', globalfunctions.checkTenderAuth, users.bid_rfq);
	app.get('/users/no_bid_rfq/:rfq_id', globalfunctions.checkTenderAuth, users.no_bid_rfq);
	app.get('/users/bids', globalfunctions.checkTenderAuth, users.get_bids);
	app.get('/users/bid/:rfq_id', globalfunctions.checkTenderAuth, users.get_rfq_bid);
	app.post('/users/save_questions/:rfq_id', globalfunctions.checkTenderAuth, users.save_questions);
	app.post('/users/rfq_submit_bid/:rfq_id', globalfunctions.checkTenderAuth, users.rfq_submit_bid);
	app.post('/users/rfq_submit_no_bid/:rfq_id', globalfunctions.checkTenderAuth, users.rfq_submit_no_bid);
	app.post('/users/revert_to_sales/:rfq_id',globalfunctions.checkTenderAuth, users.rfq_complete);


	//Customer Sales team
	app.post('/users/customer', globalfunctions.checkSalesAuth, users.add_customer);
	app.get('/users/customer', globalfunctions.checkSalesAuth, users.get_customers);
	
	// Access to All
	app.get('/users/view_quote/:rfq_id', globalfunctions.checkAllAuth, users.view_quote);
	app.get('/users/fetch_tendering_teams_members/:tendering_teams_id', globalfunctions.checkAllAuth, users.fetch_tendering_teams_members);
	app.get('/users/fetch_unit/:prop_id',globalfunctions.checkAllAuth, users.fetch_unit);
	app.get('/users/fetch_plants_properties/:product_line_id', globalfunctions.checkAllAuth, users.fetch_plants_properties);

	// Tendering Team
	app.get('/users/tendering_quote', globalfunctions.checkTenderAuth, tendering.tendering_quote_init);
	app.get('/users/tendering_quote/:rfq_id', globalfunctions.checkTenderAuth, tendering.tendering_rfq_quote);
	app.post('/users/product_designs/:rfq_id/:rfq_lines_id', globalfunctions.checkTenderAuth, tendering.product_designs);
    app.get('/users/product_designs_details/:design_id/:rfq_lines_id', globalfunctions.checkTenderAuth, tendering.product_designs_details);
    app.get('/users/minimum_price_ui/:rfq_lines_id/:product_design_id', globalfunctions.checkTenderAuth, tendering.minimum_price_ui);
    app.post('/users/put_minimum_price/:rfq_lines_id/:product_design_id', globalfunctions.checkTenderAuth, tendering.put_minimum_price);
    app.post('/users/submit_to_sales', globalfunctions.checkTenderAuth, tendering.submit_to_sales);
    app.post('/users/submit_to_sales_final', globalfunctions.checkTenderAuth, tendering.submit_to_sales_final);

     // Quotes Finalize Sales Team
    app.get('/users/quote_finalize', globalfunctions.checkSalesAuth, quote_finalize.quote_finalize_init);
    app.get('/users/quote_finalize/:rfq_id', globalfunctions.checkSalesAuth, quote_finalize.quote_finalize);
    app.get('/users/follow_up', globalfunctions.checkSalesAuth, quote_finalize.follow_up_init);
    app.get('/users/follow_up/:rfq_id', globalfunctions.checkSalesAuth, quote_finalize.follow_up);
    app.post('/users/save_finalize_quote/:rfq_id/:rfq_status_id', globalfunctions.checkSalesAuth, quote_finalize.save_finalize_quote);
    app.post('/users/mark_obsolete/:rfq_id/:rfq_status_id', globalfunctions.checkSalesAuth, quote_finalize.mark_obsolete);


    
};
