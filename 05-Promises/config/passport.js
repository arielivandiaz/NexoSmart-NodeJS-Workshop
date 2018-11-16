
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function (passport) {
    
    // *********************************************************************************

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });

    // *********************************************************************************

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true 
        },
            function (req, username, password, done) {
                console.log(" -> ", req.body.lastname);
                connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (req.body.password != req.body.password_check) {
                        console.log(req.body.password ,req.body.password_check);
                        return done(null, false, req.flash('signupMessage', 'Passwords do not match.'));
                    } else if (req.body.email != req.body.email_check) {
                        console.log(req.body.email , req.body.email_check);
                        return done(null, false, req.flash('signupMessage', 'E-mails do not match.'));
                    }
                    else if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {

                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null),  
                            name : req.body.name,
                            lastname: req.body.lastname,
                            birth_date: req.body.birth_date,
                            email: req.body.email,
                            phone: req.body.phone,
                            city: req.body.city,
                            country: req.body.country,
                            address: req.body.address
                        };

                        var insertQuery = "INSERT INTO users ( username, password, name, lastname, birth_date, email, phone, city ,country, address ) values (?,?,?,?,?,?,?,?,?,?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.name,
                            newUserMysql.lastname, newUserMysql.birth_date, newUserMysql.email, newUserMysql.phone, newUserMysql.city,
                             newUserMysql.country, newUserMysql.address, ], function (err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );

    // *********************************************************************************

    passport.use(
        'local-login',
        new LocalStrategy({        
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true 
        },
            function (req, username, password, done) { 
                connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }

                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 

                    return done(null, rows[0]);
                });
            })
    );
};