var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);
exports.getAll = function(callback) {
    var query = 'SELECT * FROM Users;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};


// exports.insert = function(params, callback) {
//     var query = 'INSERT INTO account (first_name, last_name, email) VALUES (?, ?, ?)';
//
//     // the question marks in the sql query above will be replaced by the values of the
//     // the data in queryData
//     var queryData = [params.first_name, params.last_name, params.email];
//
//     connection.query(query, queryData, function(err, result) {
//         callback(err, result);
//     });

exports.newUser = function(params, callback) {
    var query = 'INSERT INTO Users(user_name, user_email, user_password) VALUES(?, ?, ?)';
    var queryData = [params.user_name, params.user_email, params.user_password]

    connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });
};
