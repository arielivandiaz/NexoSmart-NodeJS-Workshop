
const function_step_1 = () => {
    return new Promise((resolve, reject) => {

        setTimeout(function () {
            console.log('Blah extra-blah');
            resolve("Done");
        }, 1000);
    });
}

const function_step_2 = () => {
    return new Promise((resolve, reject) => {

        setTimeout(function () {
            console.log('Blah blah extra-blah');
            resolve("Done");
        }, 850);
    });
}

const function_step_3 = () => {
    return new Promise((resolve, reject) => {

        setTimeout(function () {
            console.log('Blah blah blah blah extra-blah');
            resolve("Done");
        }, 1200);
    });
}



module.exports = {
    function_step_1,
    function_step_2,
    function_step_3
}