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
            console.log(data.complexities);
			if(data.statusCode == 200){
				var i;
				for(i=0; i< data.rfq_lines.length; ++i){
					data.rfq_lines[i].req_delivery_date = moment(data.rfq_lines[i].req_delivery_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
				res.render('users/tendering_quote', {username: req.session.member_username, tender_quote:'active', rfq: data.rfq, rfq_lines: data.rfq_lines, product_types:data.product_types, complexities: data.complexities });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.product_designs = function(req, res){
 	
    console.log(req.body);
 	req.body.user_id = req.session.member_id;
    req.body.rfq_id = req.params.rfq_id;
    req.body.rfq_lines_id = req.params.rfq_lines_id;
 
    console.log(req.body);
    
	var dGet = JSON.stringify(req.body);
	console.log(dGet);
    var options = {
        host : config.host,
        port : config.port,
        path : '/tendering_fetch_product_design_detail',
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
		    'authentication_token': req.session.token
        }
    };
 
    var reqPost = http.request(options, function(response) {
        var data_final ="";
        response.on('data', function(chunk) {
            data_final = data_final+chunk;
        });
        response.on('end',function (){
            console.log(data_final);
            var data = JSON.parse(data_final);
            if(data.statusCode == 200){
                if(data.product_designs.length > 0){
                   res.render('users/product_design_data', {rfq_lines: data.rfq_lines, product_designs: data.product_designs, props:data.filter_properties }); 
               } else {
                res.json(data);
               }
                
            } else {
                res.json(data);
            }
        });
    });
    
    reqPost.write(dGet);
	reqPost.end();
};
 
exports.product_designs_details = function(req, res){
 
    var options = {
        host : config.host,
        port : config.port,
        path : '/tendering_fetch_particular_design/'+req.session.member_id+'/'+req.params.design_id+'/'+req.params.rfq_lines_id,
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
                res.render('users/product_design_detail', { product_designs: data.design, rfq_lines_id: req.params.rfq_lines_id});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};
 
exports.submit_to_sales = function(req, res){
    console.log(req.body);
    req.body.user_id = req.session.member_id;
    var dGet = JSON.stringify(req.body);
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.port,
            path : '/tendering_submit_rfq_lines',
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
 
exports.submit_to_sales_final = function(req, res){
    console.log(req.body);
    var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_status_id=5';
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.port,
            path : '/tendering_submit_rfq_to_sales',
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

exports.minimum_price_ui = function(req, res){
 
    var options = {
        host : config.host,
        port : config.port,
        path : '/tendering_calculate_sales_price/'+req.session.member_id+'/'+req.params.rfq_lines_id+'/'+req.params.product_design_id,
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
                var overheads = [];
                for(i=0; i<data.overheads.length;i++){
                    switch(data.overheads[i].overhead_name){
                        case 'Engineering cost/hour': 
                            overheads["engineering_cost"] = data.overheads[i].value;
                            break;
                        case 'engineering overheads': 
                            overheads["engineering_overheads"] = data.overheads[i].value;
                            break;
                        case 'plant overheads': 
                            overheads["plant_overheads"] = data.overheads[i].value;
                            break;
                        case 'site overheads': 
                            overheads["site_overheads"] = data.overheads[i].value;
                            break;
                        case 'regional overheads': 
                            overheads["regional_overheads"] = data.overheads[i].value;
                            break;
                        case 'productline overheads': 
                            overheads["productline_overheads"] = data.overheads[i].value;
                            break;
                        case 'corporate overheads': 
                            overheads["corporate_overheads"] = data.overheads[i].value;
                            break;                        
                        case 'depreciation': 
                            overheads["depreciation"] = data.overheads[i].value;
                            break;
                    }
                }

                if(data.minimum_calculated_sales_price.length == 0) data.minimum_calculated_sales_price = [{}];

                res.render('users/minimum_price_ui', {initial_cost_data: data.product_cost_data[0], trans_num: data.rfq_lines[0].number_of_units, overheads:overheads, complexities:data.complexities, spec: data.minimum_calculated_sales_price} );
            } else {
                res.send(data.message);
            }
        });
    });
    reqGet.end();
};

exports.put_minimum_price = function(req, res){
    console.log(req.body);
    var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_lines_id='+req.params.rfq_lines_id+'&product_design_id='+req.params.product_design_id;
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.port,
            path : '/tendering_save_calculated_sales_price',
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