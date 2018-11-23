
module.exports =  (app) => {
	
	// Index
	app.get('/', (req, res) => {

		res.render('index.ejs', {
			message: 'Hello Node World'
		});
    });


	app.get('/welcome', function(req,res){

		console.log(req.query);
		res.write("craig");

	});

    app.post('/', (req, res) => {
        console.log("User name is : ", req.body.name);

		res.render('welcome.ejs', {
            message: 'Hello Node World',
            name: req.body.name
		});
    });

}


app.get('/calculate', function(req,res){

	res.render('waiting.ejs');

	cal_result().then(function (){     //Function in a promise, it's take 8-10 seconds
		res.redirect('/success.ejs');
	});

});
