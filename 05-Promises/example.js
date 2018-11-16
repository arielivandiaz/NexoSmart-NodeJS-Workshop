const exec = require('child_process').exec;
const cmd_1 = 'mkdir asd';
const cmd_2 = 'cd asd';

 run = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) reject(error)     

            resolve(stdout);
        });
        
    });
}

// Run async
console.log("*** Run async ***");
run(cmd_1).then((res) => {
    console.log("stdout :\n", res);


}).catch(function (rej) { //rej = error
    console.error('ERROR: ', rej);
});

run(cmd_2).then((res) => { 
    console.log("stdout :\n", res);


}).catch(function (rej) { //rej = error
    console.error('ERROR: ', rej);
});

// Run sync
run(cmd_1).then((res) => { 
    console.log("*** Run sync ***");
    console.log("stdout :\n", res);

    run(cmd_2).then((res) => { 
        console.log("stdout :\n", res);
    
    
    }).catch(function (rej) { //rej = error
        console.error('ERROR: ', rej);
    });


}).catch(function (rej) { //rej = error
    console.error('ERROR: ', rej);
});