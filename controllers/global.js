exports.checkUserAuth = function(req, res, next){
	if(typeof(req.session.member_id) === 'undefined' || typeof(req.session.priv) === 'undefined' || req.session.member_id == '' || req.session.priv != 1 ) {
	   res.redirect('/');
	} else {
		next();
	}
};