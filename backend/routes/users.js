var express = require('express');
var router = express.Router();

var users_dal = require ('../models/users_dal')
/* GET users listing. */
// localhost:3000/users/
//
router.get('/', function(req, res) {
    users_dal.getAll(function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});


// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.user_name == null) {
        res.send('user name must be provided.');
    }
    else if(req.query.user_email == null) {
        res.send('email name must be entered');
    }
    else if(req.query.user_password == null) {
        res.send('password must be entered');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        users_dal.newUser(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/');
            }
        });
    }
});

// RETURN IN JSON
router.get('/insert/checkCredentials', function(req, res) {
    if (req.query.user_name == null) {
        res.send('Could not find that username or password');
    }
    else if (req.query.user_password == null) {
        res.send('Could not find that password')
    }
    // else if (req.query.user_password == null) {
    //     res.send('Enter a password')
    // }

    else {
        users_dal.checkCredentials(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                if (result.length != 0) {
					res.status(200);
                    res.send(result);
                }
                else {
                    var json = '{"ERROR": "Invalid username or password"}';
                    var jsonString = JSON.parse(json);
                    res.send(jsonString)
                }

            }
        });
    }
});

// roter.get(/)
module.exports = router;
