
const path = require("path");
const fs = require("fs");





module.exports = function (app, passport, db_sql) {

	// LOGIN ==========================================================================
	// show the login form
	app.get('/', function (req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});

	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}),

		function (req, res) {
			if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3;
			} else {
				req.session.cookie.expires = false;
			}
			res.redirect('/');
		});


	// SIGNUP ===================================================================
	// show the signup form
	app.get('/signup', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));


	// PROFILE SECTION ==========================================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function (req, res) {

		if (req.user.type_user == 'admin') {
			console.log(req.user.username, "EL CAPO ES admin ");

			db_sql.get_query(db_sql.selectFrom_users).then(function (rows2) {
				// now you have your rows, you can see if there are <20 of them

				res.render('admin.ejs', {
					success: false,
					users: rows2,
					user_id: 0
				});

			}).catch((err) => setImmediate(() => {
				throw err;
			})); // Throw async to escape

		} else {
			console.log(req.user.username, " NO ES admin ");


			db_sql.get_query(db_sql.selectFromw_users + req.user.id).then(function (rows2) {


				res.render('profile.ejs', {
					user: rows2[0],
				});

			}).catch((err) => setImmediate(() => {
				throw err;
			})); // Throw async to escape

		}

	});


	// ADMIN SECTION ============================================================
	app.post('/delete_user', isLoggedIn, function (req, res) {

		if (req.user.type_user == 'admin') {
			console.log(Object.keys(req.body)); //Usert ID to Delete
			let sql_query_str = 'DELETE FROM `users` WHERE `id` = ' + Object.keys(req.body);
			db_sql.get_query(sql_query_str).then(function (rows) {

				console.log("Updated : ", sql_query_str);

				db_sql.get_query(db_sql.selectFrom_users).then(function (rows2) {

					res.render('admin.ejs', {
						success: true,
						users: rows2, 

						user_id: 0
					});
				}).catch((err) => setImmediate(() => {
					throw err;
				})); // Throw async to escape


			}).catch((err) => setImmediate(() => {
				throw err;
			})); // Throw async to escape

		}
	});


	app.post('/edit_user', isLoggedIn, function (req, res) {

		var user_id = Object.keys(req.body);

		if (req.user.type_user == 'admin') {

			db_sql.get_query(db_sql.selectFromw_users + user_id).then(function (rows2) {

				console.log(db_sql.selectFromw_payments + user_id);
				db_sql.get_query(db_sql.selectFromw_payments + user_id).then(function (rows3) {

					db_sql.get_query(db_sql.select_payments_types).then(function (rows4) {

						res.app.locals.user_id = user_id; //Attention with this!!! 

						res.render('admin_user.ejs', {
							user: rows2[0],

							payments: rows3,
							type_payments: rows4,
							message: '',
							success: false
						});

					}).catch((err) => setImmediate(() => {
						throw err;
					})); // Throw async to escape

				}).catch((err) => setImmediate(() => {
					throw err;
				})); // Throw async to escape

			}).catch((err) => setImmediate(() => {
				throw err;
			})); // Throw async to escape
		}
	});

	app.get('/edit_user', isLoggedIn, function (req, res) {

		var user_id = res.app.locals.user_id;

		console.log(user_id);

		if (req.user.type_user == 'admin') {

			db_sql.get_query(db_sql.selectFromw_users + user_id).then(function (rows2) {

				console.log(db_sql.selectFromw_payments + user_id);
				db_sql.get_query(db_sql.selectFromw_payments + user_id).then(function (rows3) {


					db_sql.get_query(db_sql.select_payments_types).then(function (rows4) {

						res.app.locals.user_id = user_id;

						res.render('admin_user.ejs', {
							user: rows2[0], 
							payments: rows3,
							type_payments: rows4,
							message: '',
							success: false
						});


					}).catch((err) => setImmediate(() => {
						throw err;
					})); // Throw async to escape

				}).catch((err) => setImmediate(() => {
					throw err;
				})); // Throw async to escape

			}).catch((err) => setImmediate(() => {
				throw err;
			})); // Throw async to escape

		}

	});

	app.get('/payments', isLoggedIn, function (req, res) {

		if (req.user.type_user == 'admin') {

			db_sql.get_query(db_sql.selectFrom_payments).then(function (rows) {

				res.render('payments.ejs', {
					payments: rows,
					message: '',
					success: false
				});


			}).catch((err) => setImmediate(() => {
				throw err;
			})); // Throw async to escape

		}

	});


	app.post('/add_payment', isLoggedIn, (req, res, next) => {

		let sql_query_str = '';
		if (req.body.payment_type == 1) {
			sql_query_str = 'INSERT INTO `' + db_sql.dbconfig.payments_table + '` (`id`, `type`, `user`, `date_in`, `date_out`) VALUES (NULL, ' + `'1', '` + req.body.user_id + `', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() + INTERVAL 1 YEAR )`;
		} else if (req.body.payment_type == 2) {
			sql_query_str = 'INSERT INTO `' + db_sql.dbconfig.payments_table + '` (`id`, `type`, `user`, `date_in`, `date_out`) VALUES (NULL, ' + `'2', '` + req.body.user_id + `', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() + INTERVAL 1 YEAR )`;
		} else if (req.body.payment_type == 3) {
			sql_query_str = 'INSERT INTO `' + db_sql.dbconfig.payments_table + '` (`id`, `type`, `user`, `date_in`, `date_out`) VALUES (NULL, ' + `'3', '` + req.body.user_id + `', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() + INTERVAL 1 MONTH )`;
		} else if (req.body.payment_type == 4) {
			sql_query_str = 'INSERT INTO `' + db_sql.dbconfig.payments_table + '` (`id`, `type`, `user`, `date_in`, `date_out`) VALUES (NULL, ' + `'4', '` + req.body.user_id + `', CURRENT_TIMESTAMP() , CURRENT_TIMESTAMP() + INTERVAL 1 MONTH)`;
		} else {
			console.log("ERROR APAYMENT");
			res.redirect('/profile');
		}
		console.log(sql_query_str);
		db_sql.get_query(sql_query_str).then(function () {


			res.redirect('/edit_user');

		}).catch((err) => setImmediate(() => {

			throw err;
		})); // Throw async to escape

	});




	// EDIT/VIEW PROFILE INFO ==========================================================================
	app.get('/profile_info', isLoggedIn, function (req, res) {

		db_sql.get_query(db_sql.selectFromw_payments + req.user.id).then(function (rows) {

			res.render('profile_info.ejs', {
				user: req.user,
				payments: rows, // get the user out of session and pass to template
				message: '',
				success: false
			});

		}).catch((err) => setImmediate(() => {

			throw err;
		})); // Throw async to escape

	});

	app.post('/profile_info', isLoggedIn, function (req, res) {

		//UPDATE `users` SET `phone`=[value-11],`city`=[value-12],`country`=[value-13],`address`=[value-14],`type_user`=[value-15],`activo`=[value-16] WHERE `id`=1011
		let sql_update_query = "UPDATE `users` SET ";

		if (req.body.name) {
			sql_update_query += '`name`="' + req.body.name + '",';

		}
		if (req.body.lastname) {
			sql_update_query += '`lastname`="' + req.body.lastname + '",';

		}
		if (req.body.email) {
			if (req.body.email == req.body.email_check) {
				sql_update_query += '`email`="' + req.body.email + '",';

			} else {
				res.render('profile_info.ejs', {
					user: req.user,
					success: false,
					message: "E-mails do not match"
				});
			}
		}
		if (req.body.phone) {
			sql_update_query += '`phone`="' + req.body.phone + '",';

		}
		if (req.body.birth_date) {
			sql_update_query += '`birth_date`="' + req.body.birth_date + '",';

		}
		if (req.body.address) {
			sql_update_query += '`address`="' + req.body.address + '",';

		}
		if (req.body.city) {
			sql_update_query += '`city`="' + req.body.city + '",';

		}
		if (req.body.country) {
			sql_update_query += '`country`="' + req.body.country + '",';

		}
		if (sql_update_query.length > 20) { // Update needed

			//Check the sql query string
			if (sql_update_query[sql_update_query.length - 1] == ',') {

				sql_update_query = sql_update_query.substring(0, sql_update_query.length - 1);

			}
			sql_update_query += ' WHERE `id`=' + req.user.id;

			db_sql.get_query(sql_update_query).then(function () {

				res.render('profile.ejs', {
					user: req.user,
					success: true,
					message: ''
				});


			}).catch((err) => setImmediate(() => {

				throw err;
			})); // Throw async to escape

		}

	});



	// LOGOUT ===================================================================
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});



	// 404 ===================================================================
	//The 404 Route (ALWAYS Keep this as the last route)
	app.get('*', function (req, res) {
		res.redirect('/profile');
	});


};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	else {
		res.redirect('/');
	}
	// if they aren't redirect them to the home page

}


