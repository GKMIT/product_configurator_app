exports.index = function(req, res){
   res.render('users/index', { username: req.session.member_username, title: 'CG Dashboard', dashboard:'active' });
   //console.log(moment("04/13/2014", "MM/DD/YYYY").format('YYYY-MM-DD hh:mm:ss'));
};

exports.newrfq = function(req, res){
	var options = {
		host : config.host,
		port : config.port,
		path : '/rfq_general_data/'+req.session.member_id,
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
			// console.log(data_final);
			var data = JSON.parse(data_final);
			if(response.statusCode == 200){
				res.render('users/newrfq', { username: req.session.member_username, title: 'New RFQ', rfq:'active',sub_sidebar1:'active', sales_hubs: data.sales_hubs, sales_persons:data.sales_persons, countries: data.countries, type_of_quote: data.type_of_quote, customers: data.customers, sales_segments: data.sales_segments });
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
	var name = req.body.sales_hub_id;
	console.log(req.body);

	var dGet = querystring.stringify(req.body);
	var optionsPost = {
			host : config.host,
			port : config.port,
			path : '/save_rfq_general_data',
			method : 'POST',
			headers: {
		          'Content-Type': 'application/x-www-form-urlencoded'
		    }
		};

	var reqPost = http.request(optionsPost, function(response) {
		response.on('data', function(data) {

			var data=JSON.parse(data);
			if(response.statusCode == 200){

			} else {
				res.send(data.success);
			}
		});

	});

	reqPost.write(dGet);
	reqPost.end();
};