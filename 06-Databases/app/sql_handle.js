var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);


const selectFrom_users = 'SELECT * FROM `' + dbconfig.users_table + '`';	
const selectFromw_users = 'SELECT * FROM `' + dbconfig.users_table + '` WHERE `id` = ';
const selectFrom_payments = 'SELECT * FROM `' + dbconfig.payments_table + '` WHERE 1';
const selectFromw_payments = 'SELECT * FROM `' + dbconfig.payments_table + '` WHERE `user` = ';
const check_admin =  'SELECT `type_user` FROM `' + dbconfig.users_table + '` WHERE `username` = ';
const get_email =  'SELECT `email` FROM `' + dbconfig.users_table + '` WHERE `username` = ';

const count_user_apps = 'SELECT COUNT(*) FROM `' + dbconfig.users_apps_table + '` WHERE `id_user`= ';
const select_payments_types = 'SELECT * FROM `' + dbconfig.payment_type_table + '` WHERE 1';
const select_payments_user = 'SELECT * FROM `'+ dbconfig.payments_table + '` WHERE `user`=' ;

module.exports = {
    dbconfig,
    selectFromw_payments,
    selectFrom_payments,
    selectFrom_users,
    selectFromw_users,
    get_email,
    check_admin,
    count_user_apps,
    select_payments_types,
    select_payments_user,

    get_query: (str_query) => {
        return new Promise(function(resolve, reject) {
            // The Promise constructor should catch any errors thrown on
            // this tick. Alternately, try/catch and reject(err) on catch.       
            connection.query(  str_query , function (err, rows, fields) {
                // Call reject on error states,
                // call resolve with results
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },   
}