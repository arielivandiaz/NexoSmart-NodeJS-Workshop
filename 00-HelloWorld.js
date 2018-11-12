var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {

    setTimeout(function(){    console.log('\nNexoSmart'); }, 1000);


    console.log('\nExample app listening on port 3000!');
      
    
});