module.exports = function (app, connection, crypto) {
	
	var checkAdminAuth = function(req, res, next){
	  if(typeof(req.session.member_id) === 'undefined' || typeof(req.session.priv) === 'undefined' || req.session.member_id == '' || req.session.priv != 1 ) {
	   res.redirect('/admin/');
	  } else {
	  	next();
	  }
	}

	app.get('/admin/', checkAdminAuth, function(req, res){
	 	res.render('admin/main', { username: req.session.username, title: 'CG Admin Page', dashboard:'', layouts:'active',sub_sidebar2:'active' });
	});
};