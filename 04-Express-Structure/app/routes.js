
module.exports =  (app) => {
	
	// Index
	app.get('/', (req, res) => {

		res.render('index.ejs', {
			message: 'Hello Node World'
		});
    });

    app.post('/', (req, res) => {
        console.log("User name is : ", req.body.name);

		res.render('welcome.ejs', {
            message: 'Hello Node World',
            name: req.body.name
		});
    });

}
