
const cmd = require('./commands');


module.exports = function (app, io) {


	// Index
	app.get('/', function (req, res) {

		res.render('index.ejs', {
			message: 'Hello Node World',
		});
	});

	app.post('/', function (req, res) {
			var log = "";
			io.sockets.emit('new message', { message: "Started" });
			cmd.run(cmd.step_1).then((resolve) => {

					log = " Folder Created ";
					console.log(log);
					io.sockets.emit('new message', { message: log });
					cmd.run(cmd.step_2).then((resolve) => {

							log = "Inside new Folder";
							console.log(log);
							io.sockets.emit('new message', { message: log });
							cmd.run(cmd.step_3).then((resolve) => {

									log = "New File Created";
									console.log(log);
									io.sockets.emit('new message', { message: log });
									cmd.run(cmd.step_4).then((resolve) => {

											log = "Backup File Created";
											console.log(log);
											io.sockets.emit('new message', { message: log });
																
									}).catch(function (reject) {
					
											log = "Final Step FAIL";
											console.log(log);
											io.sockets.emit('new message', { message: log });					
									});

							}).catch(function (reject) {

								log = "Third Step FAIL";
								console.log(log);
								io.sockets.emit('new message', { message: log });
							});

					}).catch(function (reject) {

						log = "Second Step FAIL";
						console.log(log);
						io.sockets.emit('new message', { message: log });
					});
			}).catch(function (reject) {
				log = "First Step FAIL";
				console.log(log);
				io.sockets.emit('new message', { message: log });
			});
	});


}

