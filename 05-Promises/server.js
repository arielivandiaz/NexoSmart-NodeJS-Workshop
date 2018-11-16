var morgan = require('morgan'); //Request logger
var express = require('express'); //Express main framework
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
var port = process.env.PORT || 3838;

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev')); // Set morgan to log every request to the console

app.set('view engine', 'ejs'); // Set up ejs how templates motor


require('./app/routes.js')(app,io); 

server.listen(port);
console.log('Server is running');


