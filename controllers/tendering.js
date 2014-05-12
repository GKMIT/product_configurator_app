exports.tendering_quote_init = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/tendering_teams_quotes/'+req.session.member_id,
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
					data.rfq[i].requested_quotation_date = moment(data.rfq[i].requested_quotation_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
					data.rfq[i].date_rfq_in = moment(data.rfq[i].date_rfq_in.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
				res.render('users/tendering_quote_init', {username: req.session.member_username, tender_quote:'active', rfq: data.rfq });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.tendering_rfq_quote = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/tendering_fetch_particular_quote/'+req.session.member_id+'/'+req.params.rfq_id,
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
				for(i=0; i< data.rfq_lines.length; ++i){
					data.rfq_lines[i].req_delivery_date = moment(data.rfq_lines[i].req_delivery_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
					data.rfq_lines[i].confirmed_delivery_date = moment(data.rfq_lines[i].confirmed_delivery_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
				res.render('users/tendering_quote', {username: req.session.member_username, tender_quote:'active', rfq: data.rfq, rfq_lines: data.rfq_lines });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.product_designs = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/tendering_fetch_product_design_detail/'+req.session.member_id+'/'+req.params.rfq_id+'/'+req.params.rfq_lines_id,
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
				res.render('users/product_designs', {username: req.session.member_username, rfq: data.rfq, rfq_lines: data.rfq_lines });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};