exports.quote_finalize_init = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/sales_quote_finalize_fetch_all/'+req.session.member_id,
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
					data.rfq[i].quote_creation_date = moment(data.rfq[i].quote_creation_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
				res.render('users/quote_finalize_init', {username: req.session.member_username, priv: req.session.priv, quote:'active', sub_sidebar1:'active', rfq: data.rfq });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.follow_up_init = function(req, res){

    var options = {
        host : config.host,
        port : config.port,
        path : '/sales_quote_followup_fetch_all/'+req.session.member_id,
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
                var now = moment();
                for(i=0; i< data.rfq.length; ++i){
                    data.rfq[i].quote_submission_date = moment(data.rfq[i].quote_submission_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
                    data.rfq[i].timediff = now.diff(data.rfq[i].quote_validity_date);
                    data.rfq[i].quote_validity_date = moment(data.rfq[i].quote_validity_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
                    if(data.rfq[i].by_when != '0000-00-00 00:00:00')
                        data.rfq[i].by_when = moment(data.rfq[i].by_when.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
                    else  data.rfq[i].by_when = '';
                }
                 console.log(data);
                res.render('users/follow_up_init', {username: req.session.member_username, priv: req.session.priv, quote:'active', sub_sidebar2:'active', rfq: data.rfq});
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};

exports.quote_finalize = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/sales_quote_finalize_fetch_one/'+req.session.member_id+'/'+req.params.rfq_id,
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
					data.rfq[i].quote_creation_date = moment(data.rfq[i].quote_creation_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
				}
				res.render('users/quote_finalize', {username: req.session.member_username, priv: req.session.priv, quote:'active', sub_sidebar1:'active', rfq: data.rfq, probabilities:data.probability, rejection_remarks:data.rejection_remarks });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};
exports.save_finalize_quote = function(req, res){
    console.log(req.body);
    req.body.quote_validity_date = moment(req.body.quote_validity_date , "DD-MM-YYYY").format('YYYY-MM-DD hh:mm:ss');
    req.body.quote_submission_date = moment(req.body.quote_submission_date , "DD-MM-YYYY").format('YYYY-MM-DD hh:mm:ss');
    var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_status_id='+req.params.rfq_status_id+'&rfq_id='+req.params.rfq_id;
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.port,
            path : '/sales_quote_finalize_submit',
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

exports.extend_validity = function(req, res){
    console.log(req.body);
    req.body.validity_date = moment(req.body.validity_date , "DD-MM-YYYY").format('YYYY-MM-DD hh:mm:ss');
    var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_id='+req.params.rfq_id;
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.port,
            path : '/extend_validity_period_quote',
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

exports.save_followup_quote = function(req, res){
    console.log(req.body);
    req.body.by_when = moment(req.body.by_when , "DD-MM-YYYY").format('YYYY-MM-DD hh:mm:ss');
    // req.body.quote_submission_date = moment(req.body.quote_submission_date , "DD-MM-YYYY").format('YYYY-MM-DD hh:mm:ss');
    var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_status_id='+req.params.rfq_status_id+'&rfq_id='+req.params.rfq_id;
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.port,
            path : '/sales_quote_followup_update',
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

exports.follow_up = function(req, res){

	var options = {
		host : config.host,
		port : config.port,
		path : '/sales_quote_followup_fetch_one/'+req.session.member_id+'/'+req.params.rfq_id,
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
					data.rfq[i].quote_validity_date = moment(data.rfq[i].quote_validity_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
					data.rfq[i].quote_submission_date = moment(data.rfq[i].quote_submission_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
                    data.rfq[i].quote_creation_date = moment(data.rfq[i].quote_creation_date.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
					if(data.rfq[i].by_when != '0000-00-00 00:00:00')
                        data.rfq[i].by_when = moment(data.rfq[i].by_when.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
                    else  data.rfq[i].by_when = '';
				}
				res.render('users/follow_up', {username: req.session.member_username, priv: req.session.priv, quote:'active', sub_sidebar2:'active', rfq: data.rfq, probabilities:data.probability,rejection_remarks:data.rejection_remarks });
			} else {
				res.send(data.success);
			}
		});
	});
	reqGet.end();
};

exports.mark_obsolete = function(req, res){
    var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id+'&rfq_status_id='+req.params.rfq_status_id+'&rfq_id='+req.params.rfq_id;
    console.log(dGet);
    var options = {
            host : config.host,
            port : config.port,
            path : '/sales_quote_followup_obsolete',
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

exports.archive_followup = function(req, res){

    var options = {
        host : config.host,
        port : config.port,
        path : '/archive_followup/'+req.session.member_id,
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
                    data.rfq[i].date_rfq_in = moment(data.rfq[i].date_rfq_in.substring(0,10), "YYYY-MM-DD").format('DD-MM-YYYY');
                }
                res.render('users/quote_archive_init', {username: req.session.member_username, priv: req.session.priv, quote:'active', sub_sidebar3:'active', rfq: data.rfq });
            } else {
                res.send(data.success);
            }
        });
    });
    reqGet.end();
};


exports.archive_rfq_copy = function(req, res){

    var dGet = querystring.stringify(req.body)+'&user_id='+req.session.member_id;
    console.log(dGet);
    var options = {
        host : config.host,
        port : config.port,
        path : '/archive_rfq_copy/',
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