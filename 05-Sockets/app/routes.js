

const connections = [];


module.exports = function (app, io) {


	io.sockets.on('connection', (socket) => {
		connections.push(socket);
		console.log(' %s sockets is connected', connections.length);

		socket.on('disconnect', () => {
			connections.splice(connections.indexOf(socket), 1);
		});

		socket.on('sending message', (message) => {
			console.log('Message is received :', message);

			io.sockets.emit('new message', { message: message });
		});
	});


	app.get('/', function (req, res) {


		res.render('index.ejs', {
			message: 'Hello Node World',
		});
	});




}
