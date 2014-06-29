exports.checkSalesAuth = function(req, res, next){
	if(typeof(req.session.member_id) === 'undefined' || typeof(req.session.priv) === 'undefined' || req.session.member_id == '' || (req.session.priv != 1 && req.session.priv != 3 && req.session.priv != 4) ) {
	   res.redirect('/');
	} else {
		next();
	}
};

exports.checkTenderAuth = function(req, res, next){
	if(typeof(req.session.member_id) === 'undefined' || typeof(req.session.priv) === 'undefined' || req.session.member_id == '' || (req.session.priv != 2 && req.session.priv != 3 && req.session.priv != 4) ) {
	   res.redirect('/');
	} else {
		next();
	}
};

exports.checkSalesTenderAuth = function(req, res, next){
	if(typeof(req.session.member_id) === 'undefined' || typeof(req.session.priv) === 'undefined' || req.session.member_id == '' || (req.session.priv != 3 && req.session.priv != 4) ) {
	   res.redirect('/');
	} else {
		next();
	}
};

exports.checkAdminAuth = function(req, res, next){
	if(typeof(req.session.member_id) === 'undefined' || typeof(req.session.priv) === 'undefined' || req.session.member_id == '' || req.session.priv != 4 ) {
	   res.redirect('/');
	} else {
		next();
	}
};

exports.checkAllAuth = function(req, res, next){
	if(typeof(req.session.member_id) === 'undefined' || typeof(req.session.priv) === 'undefined' || req.session.member_id == '') {
	   res.redirect('/');
	} else {
		next();
	}
};