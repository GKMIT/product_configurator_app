exports.index = function(req, res){
   res.render('users/index', { username: req.session.member_username, title: 'CG Dashboard', dashboard:'active' });
   //console.log(moment("04/13/2014", "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss'));
};

exports.newrfq = function(req,res){
	res.redirect("/users/rfq_general_data/new");
};

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
			if(data.statusCode == 200){
				if(data.selected_rfq == ''){
					data.selected_rfq=[{id:0,rfq_status_id:0}];
				} else {
					data.selected_rfq[0].date_rfq_in = moment(data.selected_rfq[0].date_rfq_in.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
					data.selected_rfq[0].requested_quotation_date = moment(data.selected_rfq[0].requested_quotation_date.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
					if(data.selected_rfq[0].product_lines_id != 0){
						flag_product = true; 
						flag_line = true; 
					} else { flag_product = true;}
				}
				if(data.selected_rfq[0].rfq_status_id == 1){
					var flag_1 = ''; var flag_2 = 'active'; 
				} else {
					var flag_1 = 'active'; var flag_2 = ''; 
				}
				res.render('users/newrfq', { username: req.session.member_username, title: 'New RFQ', rfq:'active',sub_sidebar1:flag_1, sub_sidebar2:flag_2, sales_hubs: data.sales_hubs, sales_persons:data.sales_persons, countries: data.countries, type_of_quote: data.type_of_quote, customers: data.customers, sales_segments: data.sales_segments, selected_rfq:data.selected_rfq, sales_agents:data.sales_agents, sales_persons:data.sales_persons, probabilities:probabilities, flag_product:flag_product, flag_line:flag_line });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.get_bids = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/ready_rfq_bid/'+req.session.member_id,
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
			if(data.statusCode == 200){
				var i;
				for(i=0; i< data.rfq.length; ++i){
					data.rfq[i].date_rfq_in = moment(data.rfq[i].date_rfq_in.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
				}
				res.render('users/bids', {username: req.session.member_username, bid:'active', rfqs: data.rfq });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.get_rfq_bid = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/ready_rfq_bid_detail/'+req.session.member_id+'/'+req.params.rfq_id,
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
			if(data.statusCode == 200){
				var i;
				for(i=0; i< data.rfq.length; ++i){
					data.rfq[i].requested_quotation_date = moment(data.rfq[i].requested_quotation_date.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
				}
				res.render('users/bid_rfq_init', {username: req.session.member_username, bid:'active', rfq: data.rfq, rfq_questions : data.rfq_questions });
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
			if(data.statusCode == 200){
				console.log(data.sales_persons);
				res.send(data.sales_persons);
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.fetch_plants_properties = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/fetch_product_plants_properties/'+req.session.member_id+'/'+req.params.product_line_id,
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
			if(data.statusCode == 200){
				res.json(data);
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
			if(data.statusCode == 200){
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
			if(data.statusCode == 200){
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
			if(data.statusCode == 200){
				if(data.selected_rfq[0].rfq_status_id == 1){
					var flag_1 = ''; var flag_2 = 'active'; 
				} else {
					var flag_1 = 'active'; var flag_2 = ''; 
				}

				res.render('users/product_data', { username: req.session.member_username, title: 'RFQ Product Data', rfq:'active',sub_sidebar1:flag_1,sub_sidebar2:flag_2, product_lines:data.product_lines, selected_rfq:data.selected_rfq, tendering_teams:data.tendering_teams, tendering_teams_members: data.tendering_teams_members, flag_line:flag_line});
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
			if(data.statusCode == 200){
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
			if(data.statusCode == 200){
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
			if(data.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};

exports.update_rfq_general_data = function(req, res){
	console.log(req.body);
	var requested_quotation_date = moment(req.body.requested_quotation, "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss');
	var date_rfq_in = moment(req.body.date_rfq, "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss');
	var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&requested_quotation_date='+requested_quotation_date+'&date_rfq_in='+date_rfq_in;

	console.log(dGet);
	var options = {
			host : config.host,
			port : config.port,
			path : '/update_rfq_general_data',
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
			if(data.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};

exports.rfq_complete = function(req, res){
	console.log(req.body);

	var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_id='+req.params.rfq_id;

	var options = {
			host : config.host,
			port : config.port,
			path : '/complete_rfq',
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
			if(data.statusCode == 200){
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
	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_new_line_item/'+req.session.member_id+'/'+req.params.rfq_id,
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
			if(data.statusCode == 200){
				var i;
				for(i=0; i < data.selected_rfq_lines_items.length; ++i){
					data.selected_rfq_lines_items[i].req_delivery_date = moment(data.selected_rfq_lines_items[i].req_delivery_date.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
				}
				if(data.selected_rfq[0].rfq_status_id == 1){
					var flag_1 = ''; var flag_2 = 'active'; 
				} else {
					var flag_1 = 'active'; var flag_2 = ''; 
				}
				res.render('users/line_items', { username: req.session.member_username, title: 'RFQ Product Data', rfq:'active',sub_sidebar1:flag_1,sub_sidebar2:flag_2, selected_rfq:data.selected_rfq, product_lines:data.product_lines, selected_rfq_lines_items:data.selected_rfq_lines_items });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.fetch_rfq_line_items = function(req, res){
	var options = {
		host : config.host,
		port : config.port,
		path : '/fetch_rfq_line_items/'+req.session.member_id+'/'+req.params.rfq_id+'/'+req.params.line_item,
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
			if(data.statusCode == 200){
				var options2 = {
					host : config.host,
					port : config.port,
					path : '/fetch_product_plants_properties/'+req.session.member_id+'/'+data.rfq_lines[0].product_lines_id,
					method : 'GET',
					headers: {
						'Content-Type':'application/json',
				        'authentication_token': req.session.token
			   		}
				};
				var reqGet2 = http.request(options2, function(response) {
					var data_final2 ="";
					response.on('data', function(chunk) {
						data_final2 = data_final2+chunk;
					});
					response.on('end',function (){
						var data2 = JSON.parse(data_final2);
						if(data2.statusCode == 200){
							data.rfq_lines[0].req_delivery_date = moment(data.rfq_lines[0].req_delivery_date.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
							var option_string = '<option value="0">Select Property</option>';
							var i;
							for (i = 0; i < data2.product_properties.length; ++i) {
								option_string += '<option value="'+ data2.product_properties[i].id+'">'+ data2.product_properties[i].property_name+'</option>';
							};

							res.render('users/fetch_line_items', { rfq_lines:data.rfq_lines, production_plants:data2.production_plants, product_properties:data2.product_properties, technical_specifications:data.technical_specifications, product_lines:data.product_lines, option_string:option_string });
						} else {
							res.send(data2.success);
						}
					});
				});
				reqGet2.end();
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.save_line_item = function(req, res){
	console.log(req.body);

	var props = req.body.product_properties_id;
	var values = req.body.value;
	var remarks = req.body.remark;

	var i;
	req.body.technical_specifications = [];

	if(typeof props !== 'undefined'){
		for (i = 0; i < props.length; ++i) {
	 		var obj = { 'product_properties_id':props[i], 'value':values[i], 'remark':remarks[i]};
	        if(props[i] != 0){
	        	req.body.technical_specifications[i] = obj;
	        }
	    }
	}
 	
    console.log(req.body);

	var req_delivery_date = moment(req.body.delivery_date, "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss');
	req.body.user_id = req.session.member_id;
	req.body.req_delivery_date = req_delivery_date;
	req.body.rfq_id = req.params.rfq_id;
	

	delete req.body.product_properties_id;
	delete req.body.value;
	delete req.body.remark;
	var dGet = JSON.stringify(req.body);

	console.log(req.body);
	var options = {
			host : config.host,
			port : config.port,
			path : '/save_line_item',
			method : 'POST',
			headers: {
		          'Content-Type': 'application/json',
		          'authentication_token': req.session.token
		    }
		};

	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(data.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};

exports.update_line_item = function(req, res){
	console.log(req.body);
	var props = req.body.product_properties_id;
	var values = req.body.value;
	var remarks = req.body.remark;

	var i;
	req.body.technical_specifications = [];

	if(typeof props !== 'undefined'){
	 	for (i = 0; i < props.length; ++i) {
	 		var obj = { 'product_properties_id':props[i], 'value':values[i], 'remark':remarks[i]};
	        if(props[i] != 0){
	        	req.body.technical_specifications[i] = obj;
	        }
	    }
	}
    console.log(req.body);

	var req_delivery_date = moment(req.body.delivery_date, "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss');
	req.body.user_id = req.session.member_id;
	req.body.req_delivery_date = req_delivery_date;
	
	delete req.body.product_properties_id;
	delete req.body.value;
	delete req.body.remark;

	var dGet = JSON.stringify(req.body);

	console.log(req.body);
	var options = {
			host : config.host,
			port : config.port,
			path : '/update_line_item',
			method : 'PUT',
			headers: {
		          'Content-Type': 'application/json',
		          'authentication_token': req.session.token
		    }
		};

	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(data.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};


exports.delete_line_item = function(req, res){
	
	var dGet = querystring.stringify(req.body);
	var options = {
			host : config.host,
			port : config.port,
			path : '/delete_line_item/'+req.session.member_id+'/'+req.body.rfq_lines_id,
			method : 'DELETE',
			headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'authentication_token': req.session.token
		    }
		};

	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(data.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});
	reqPost.write(dGet);
	reqPost.end();
};

exports.finalize = function(req, res){

		var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_finalize/'+req.session.member_id,
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
			if(data.success == 'true'){
				var i;
				for(i=0; i< data.partial_rfq.length; ++i){
					data.partial_rfq[i].date_rfq_in = moment(data.partial_rfq[i].date_rfq_in.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
				}
				res.render('users/finalize', { username: req.session.member_username, title: 'Finalize', rfq:'active',sub_sidebar2:'active', partial_rfq:data.partial_rfq });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.finalize_rfq = function(req, res){

	req.body.user_id = req.session.member_id;
	req.body.rfq_id = req.params.rfq_id;
	req.body.rfq_status_id = 1;
	var dGet = querystring.stringify(req.body);

	var options = {
		host : config.host,
		port : config.port,
		path : '/complete_rfq',
		method : 'PUT',
		headers: {
			'Content-Type':'application/x-www-form-urlencoded',
	        'authentication_token': req.session.token
	    }
	};

	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(data.statusCode == 200){
				res.redirect('/users/rfq_general_data/'+req.params.rfq_id);
			} else {
				res.json(data);
			}
		});

	});
	reqPost.write(dGet);
	reqPost.end();
};

exports.fetch_unit = function(req, res){

		var options = {
		host : config.host,
		port : config.port,
		path : '/fetch_property_detail/'+req.session.member_id+'/'+req.params.prop_id,
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
			if(data.success == 'true'){
				res.send(data);
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.save_questions = function(req, res){
	console.log(req.body);

	var i;
	
	var prop = Object.keys(req.body);
	req.body.questions = [];
	if(typeof prop !== 'undefined'){
		for (i = 0; i < prop.length; ++i) {
			var ques = prop[i];
			var resp = ques.split("_");

	 		var obj = { 'question_id':resp[1], 'value':req.body[ques]};
	        	req.body.questions[i] = obj;
	    }
	}
 	
    console.log(req.body);

	req.body.user_id = req.session.member_id;
	req.body.rfq_id = req.params.rfq_id;
	
	var dGet = JSON.stringify(req.body);

	console.log(req.body);
	var options = {
			host : config.host,
			port : config.port,
			path : '/save_rfq_questions',
			method : 'POST',
			headers: {
		          'Content-Type': 'application/json',
		          'authentication_token': req.session.token
		    }
		};

	var reqPost = http.request(options, function(response) {
		response.on('data', function(data) {
			var data=JSON.parse(data);
			console.log(data);
			if(data.statusCode == 200){
				res.json(data);
			} else {
				res.json(data);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};

exports.bid_rfq = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/full_rfq_detail/'+req.session.member_id+'/'+req.params.rfq_id,
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
			if(data.statusCode == 200){
				var i;
				for(i=0; i< data.rfq.length; ++i){
					data.rfq[i].date_rfq_in = moment(data.rfq[i].date_rfq_in.substring(0,10), "YYYY-MM-DD").format('MM/DD/YYYY');
				}
				res.render('users/bid_rfq', {username: req.session.member_username, bid:'active', rfq: data.rfq, rfq_lines: data.rfq_lines });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};