exports.index = function(req, res){
   res.render('users/index', { username: req.session.member_username, title: 'CG Dashboard', dashboard:'active' });
   //console.log(moment("04/13/2014", "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss'));
};

exports.newrfq = function(req,res){
	res.redirect("/users/rfq_general_data/new");
}

exports.rfq_general_data = function(req, res){

	var flag_product = false;
	var flag_line = false;

	if(req.params.rfq_id == 'new'){
		rfq_id = 0;
	} else rfq_id = req.params.rfq_id;

	var probabilities = ["Select Probability ","20","40","60","80"];
	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_general_data/'+req.session.member_id+'/'+rfq_id,
		method : 'GET',
		headers: {
			'Content-Type':'application/json',
	        'authentication_token': req.session.token
	    }
	};

	var reqGet = http.request(options, function(response) {
		var data_final ="";
		response.on('data', function(chunk) {
			data_final = data_final+chunk;
		});
		response.on('end',function (){
			console.log(data_final);
			var data = JSON.parse(data_final);
			if(response.statusCode == 200){
				if(data.selected_rfq == ''){
					data.selected_rfq=[{}];
				} else {
					data.selected_rfq[0].date_rfq_in = moment(data.selected_rfq[0].date_rfq_in.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
					data.selected_rfq[0].requested_quotation_date = moment(data.selected_rfq[0].requested_quotation_date.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
					if(data.selected_rfq[0].product_lines_id != 0){
						flag_product = true; 
						flag_line = true; 
					} else { flag_product = true;}
				}
				res.render('users/newrfq', { username: req.session.member_username, title: 'New RFQ', rfq:'active',sub_sidebar1:'active', sales_hubs: data.sales_hubs, sales_persons:data.sales_persons, countries: data.countries, type_of_quote: data.type_of_quote, customers: data.customers, sales_segments: data.sales_segments, selected_rfq:data.selected_rfq, sales_agents:data.sales_agents, sales_persons:data.sales_persons, probabilities:probabilities, flag_product:flag_product, flag_line:flag_line });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.fetch_sales_persons = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_general_data_sales_persons/'+req.session.member_id+'/'+req.params.id,
		method : 'GET',
		headers: {
			'Content-Type':'application/json',
	        'authentication_token': req.session.token
	    }
	};
	var reqGet = http.request(options, function(response) {
		var data_final ="";
		response.on('data', function(chunk) {
			data_final = data_final+chunk;
		});
		response.on('end',function (){
			var data = JSON.parse(data_final);
			if(response.statusCode == 200){
				console.log(data.sales_persons);
				res.send(data.sales_persons);
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.fetch_sales_agents = function(req, res){
	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_general_data_sales_agents/'+req.session.member_id+'/'+req.params.id,
		method : 'GET',
		headers: {
			'Content-Type':'application/json',
	        'authentication_token': req.session.token
	    }
	};
	var reqGet = http.request(options, function(response) {
		var data_final ="";
		response.on('data', function(chunk) {
			data_final = data_final+chunk;
		});
		response.on('end',function (){
			var data = JSON.parse(data_final);
			if(response.statusCode == 200){
				console.log(data.sales_agents);
				res.send(data.sales_agents);
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.save_rfq_general_data = function(req, res){
	console.log(req.body);
	var requested_quotation_date = moment(req.body.requested_quotation, "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss');
	var date_rfq_in = moment(req.body.date_rfq, "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss');
	var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&requested_quotation_date='+requested_quotation_date+'&date_rfq_in='+date_rfq_in;
	console.log(dGet);
	var options = {
			host : config.host,
			port : config.port,
			path : '/save_rfq_general_data',
			method : 'POST',
			headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'authentication_token': req.session.token
		    }
		};

	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(response.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};

exports.rfq_product_data = function(req, res){
	var flag_line = false;
	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_product_lines/'+req.session.member_id+'/'+req.params.rfq_id,
		method : 'GET',
		headers: {
				'Content-Type':'application/json',
	          	'authentication_token': req.session.token
	    }
	};
	var reqGet = http.request(options, function(response) {
		var data_final ="";
		response.on('data', function(chunk) {
			data_final = data_final+chunk;
		});
		response.on('end',function (){
			console.log(data_final);
			var data = JSON.parse(data_final);
			if(data.selected_rfq[0].product_lines_id != 0) flag_line = true;
			if(response.statusCode == 200){
				res.render('users/product_data', { username: req.session.member_username, title: 'RFQ Product Data', rfq:'active',sub_sidebar1:'active', product_lines:data.product_lines, selected_rfq:data.selected_rfq, tendering_teams:data.tendering_teams, tendering_teams_members: data.tendering_teams_members, flag_line:flag_line});
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.fetch_tendering_teams = function(req, res){
	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_tendering_teams/'+req.session.member_id+'/'+req.params.product_line_id,
		method : 'GET',
		headers: {
			'Content-Type':'application/json',
	        'authentication_token': req.session.token
	    }
	};
	var reqGet = http.request(options, function(response) {
		var data_final ="";
		response.on('data', function(chunk) {
			data_final = data_final+chunk;
		});
		response.on('end',function (){
			var data = JSON.parse(data_final);
			if(response.statusCode == 200){
				res.send(data.tendering_teams);
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.fetch_tendering_teams_members = function(req, res){
	console.log("yes");
	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_tendering_teams_members/'+req.session.member_id+'/'+req.params.tendering_teams_id,
		method : 'GET',
		headers: {
			'Content-Type':'application/json',
	        'authentication_token': req.session.token
	    }
	};
	var reqGet = http.request(options, function(response) {
		var data_final ="";
		response.on('data', function(chunk) {
			data_final = data_final+chunk;
		});
		response.on('end',function (){
			var data = JSON.parse(data_final);
			if(response.statusCode == 200){
				res.send(data.tendering_teams_members);
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.save_rfq_product_data = function(req, res){
	console.log(req.body);
	var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_id='+req.params.rfq_id;
	console.log(dGet);
	var options = {
			host : config.host,
			port : config.port,
			path : '/general_product_data_save',
			method : 'PUT',
			headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'authentication_token': req.session.token
		    }
		};

	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(response.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};

exports.rfq_line_items = function(req, res){
	// var options = {
	// 	host : config.host,
	// 	port : config.port,
	// 	path : '/rfq_general_data/'+req.session.member_id+'/'+req.params.id,
	// 	method : 'GET',
	// 	headers: {
	// 			'Content-Type':'application/json',
	//           'authentication_token': req.session.token
	//     }
	// };
	// var reqGet = http.request(options, function(response) {
	// 	var data_final ="";
	// 	response.on('data', function(chunk) {
	// 		data_final = data_final+chunk;
	// 	});
	// 	response.on('end',function (){
	// 		// console.log(data_final);
	// 		var data = JSON.parse(data_final);
	// 		if(response.statusCode == 200){
				res.render('users/line_items', { username: req.session.member_username, title: 'RFQ Product Data', rfq:'active',sub_sidebar1:'active' });
	// 		} else {
	// 			res.send(data.success);
	// 		}
	// 	});
	// });
	// reqGet.end();
};

exports.save_rfq_line_items = function(req, res){
	console.log("Yes");
	console.log(req.body);
};